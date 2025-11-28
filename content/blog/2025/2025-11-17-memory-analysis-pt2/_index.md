---
title: "Memory Analysis with Velociraptor - Part 2"
description: |
    This blog is the second part of the memory analysis series.
    We will dive into how to detect fileless malware with Velociraptor
    live in RAM (i.e. without dumping the RAM).

tags:
 - DFIR
 - Memory

author: "Dr. Michael Denzel, Lautaro Lecumberry"
date: 2025-11-17
noindex: false
---

In [Memory Analysis with Velociraptor - Part 1]({{< ref
"/blog/2025/2025-11-15-memory-analysis-pt1/" >}}) we looked at how to access
the RAM with velociraptor. In this post, we look at how to find fileless
malware.


# 0. Abstract

Commonly, in an incident response scenario one has a live attacker in the
network but does not know which systems are compromised. Networks can be quite
large and include >10.000 systems. Additionally, attackers nowadays use Command
and Control (C2) frameworks running in Random Access Memory (RAM).

Our approach finds the C2 frameworks without knowing where the attacker is,
without dumping the RAM and scaling to >10.000 systems.

Our custom Velociraptor Query Language (VQL) artifact
[Windows.Memory.Mem2Disk]({{< ref
"/exchange/artifacts/pages/windows.memory.mem2disk/" >}}) compares the code in
the .text segment of every process to the code of the executable on
disk. Leveraging Velociraptor, we can execute this artifact on >10.000 systems
simultaneously and we can analyze the RAM live without actually dumping it.


# 1. Introduction

The most difficult to detect cyber attacks nowadays are RAM-only attacks or
file-less attacks. As most security tools focus on detections in persistent
storage (hard disks), attackers avoid them by leveraging the RAM. Commonly,
malicious code is injected into legitimate processes live in RAM.

We already detected fileless malware in a [proof-of-concept
implementation](https://github.com/lautarolecumberry/DetectingFilelessMalware/blob/main/DetectingFilelessMalware.pdf). Our
goal is now to improve detection and to detect fileless instances of
professional C2 frameworks live without dumping the RAM across a network of
computers.


# 2. Background and Existing Techniques

## 2.1. Volatility & Malfind

One of the main existing tools to analyze the RAM is
[volatility](https://github.com/volatilityfoundation/volatility3). It requires
creating an offline RAM dump first with other tools like
[WinPmem](https://github.com/Velocidex/WinPmem) which takes considerable
time. Afterwards, this dump can be analyzed with volatility.

Most commands of volatility require in-depth knowledge of the RAM and the
operating system. An exception is `malfind`, which searches for memory pages
that are writable and executable. The hypothesis is that memory pages are
either writable or executable. If executable pages are writable again, it means
an injection took place and the page is flagged.

## 2.2. Hollowshunter

[Hollowshunter](https://github.com/hasherezade/hollows_hunter) scans the RAM of
one machine for various malware injection techniques. It uses
[PE-sieve](https://github.com/hasherezade/pe-sieve), a tool to scan a single
process.

## 2.3. MemProcFS

[MemProcFS](https://github.com/ufrisk/MemProcFS) provides a filesystem-like
view of the RAM. This way, files can easily be accessed. However, detection of
malware is mostly left to the analyst.

# 3. Methodology

To test against C2 frameworks, we use the most common open source C2 frameworks
and inject shellcode (e.g. an implant) into a legitimate process. The utilized
C2 frameworks are [Sliver](https://github.com/BishopFox/sliver),
[Havoc](https://github.com/HavocFramework/Havoc), and
[Mythic](https://github.com/its-a-feature/Mythic).

Our test setup consists of two virtual machines, a Kali machine (attacker) and
a Windows 10 host (victim). Both machines can reach each other and the
anti-virus (Windows Defender) is turned off. Anti-virus bypasses are not the
focus in this article and were therefore excluded.

## 3.1. Sliver Setup

We create a Sliver HTTP agent and deploy it on the victim computer.
Afterwards, we create a beacon and injected it using `execute-assembly --ppid
<ppid> --process <process.exe> ./beacon.exe`.

## 3.2. Havoc Setup

After creating and executing the Havoc agent, we use `shellcode inject x64
<pid> /path/to/shellcode.bin` to inject into a process.

## 3.3. Mythic Setup

Similar to Sliver and Havoc, we create a Mythic agent and we deploy it. We use
the `Apollo` agent and `http` C2 profile.

To inject into a process we use `shinject -PID <pid> -File
/path/to/shellcode.bin`.

## 3.4. Shellcode

The shellcode used in the tests is created using the Python `pwntools` library
with the following script.

```python
from pwn import *

context.update(arch="amd64")
path = "C:\\Program Files\\example\\example.exe"
pay = (asm(shellcraft.amd64.windows.winexec(path)))

with open("shellcode.bin", "wb") as bf:
    bf.write(pay)
```

We simply start a random executable with the shellcode. Usually, an attacker
would start a beacon or backdoor.


# 4. Technique

## 4.1. Velociraptor

[Memory Analysis with Velociraptor - Part 1]({{< ref
"/blog/2025/2025-11-15-memory-analysis-pt1/" >}}) already described in depth
how to access the RAM with Velociraptor. This works live with the accessors of
Velociraptor, so we do not need to dump the entire RAM. It scales up to
thousands of computers, therefore, we can detect C2 frameworks in entire
networks without previously knowing which machines are infected.

Our detection technique, `Windows.Memory.Mem2Disk`, compares the .text segment
of running processes to the executable on disk. Any deviation indicates
suspicious behaviour, i.e. mostly RAM injections.

## 4.2. BaseOfData and ASLR

While this detection sounds trivial, code in RAM and code on disk should not
match. Address Space Layout Randomization (ASLR) and Relative Virtual Address
(RVA) introduce offsets to the RAM.

Interestingly, in our experiments, most of the time code in RAM perfectly
matched the code on disk. As it turns out, modern compilers and linkers nearly
exclusively use relative jumps instead of absolute ones.

The only common exception we found in our experiments was the RVA `BaseOfDate`
of 32-bit executables (see
[Microsoft](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#optional-header-image-only)
and [0xrick](https://0xrick.github.io/win-internals/pe4/) for details).

In the first stage of our experiments, `BaseOfData` introduces changes to the
.text segment of one byte. Since this is a relative address, the offset between
code and memory content is always the same and actually represents the Address
Space Layout Randomization (ASLR) offset. For example, in our analysis of
`firefox.exe` process, we observed the following differences (see Table 1).

| Memory  | Disk  | Times | Difference |
|---------|-------|-------|------------|
|    0x44 |  0x06 |  2724 |  62 (0x3e) |
|    0x45 |  0x07 |  2385 |  62 (0x3e) |
|    0x42 |  0x04 |    21 |  62 (0x3e) |
|    0x40 |  0x02 |    27 |  62 (0x3e) |
|    0x43 |  0x05 |    12 |  62 (0x3e) |
|    0x41 |  0x03 |     1 |  62 (0x3e) |

Table 1: Firefox `BaseOfData` offsets

Thanks to Mike Cohen we were able to improve our VQL code, calculate the ASLR
offset and ignore these false positives. Thus, eliminating false positives from
ASLR as well as `BaseOfData` in one go.

Afterwards, none of the legitimate processes we analyzed were detected (see
Table 2).

| Name                   | BaseOfData | Detected | Detected ignoring ASLR    |
|------------------------|------------|----------|---------------------------|
| Adobe Acrobat Reader   | yes        | yes      | no                        |
| Command Prompt         | no         | no       | no                        |
| Discord                | no         | no       | no                        |
| Google Chrome (x32)    | yes        | yes      | no                        |
| Google Chrome (x64)    | no         | no       | no                        |
| LibreOffice Writer     | yes        | yes      | no                        |
| LibreOffice Calc       | yes        | yes      | no                        |
| Microsoft Edge         | no         | no       | no                        |
| Microsoft Edge Updates | yes        | yes      | no                        |
| Microsoft Teams        | no         | no       | no                        |
| Mozilla Firefox (x32)  | yes        | yes      | no                        |
| Mozilla Firefox (x64)  | no         | no       | no                        |
| Spotify                | yes        | yes      | no                        |
| Velociraptor           | yes        | yes      | no                        |
| VLC                    | yes        | yes      | no                        |
| Windows Calculator     | no         | no       | no                        |
| WordPad                | no         | no       | no                        |
| Zoom                   | yes        | yes      | no                        |

Table 2: Legitimate binaries with and without ignoring ASLR

# 5. Results

Additionally to legitimate binaries, we tested the (RAM-based) malware samples
shown in Table 3.

| Num |      Sample       | Detected |
|-----|-------------------|----------|
|  1  | AgentTesla        | yes      |
|  2  | AssemblyInjection | no       |
|  3  | Astaroth          | no       |
|  4  | Azorult           | yes      |
|  5  | BADNEWS           | yes      |
|  6  | bandook           | yes      |
|  7  | Donut             | no       |
|  8  | Dyre              | yes      |
|  9  | Empire            | no       |
| 10  | Gh0stRAT          | yes      |
| 11  | GuLoader          | yes      |
| 12  | Havoc C2          | yes      |
| 13  | HopLight          | no       |
| 14  | HyperBro          | yes      |
| 15  | Injection PoC     | no       |
| 16  | ISMAgent          | yes      |
| 17  | lokibot           | yes      |
| 18  | Mythic C2         | yes      |
| 19  | netwire           | yes      |
| 20  | Pandora           | yes      |
| 21  | Platinum Group    | no       |
| 22  | qakbot            | no       |
| 23  | remcos            | yes      |
| 24  | REvil             | yes      |
| 25  | RokRAT            | yes      |
| 26  | Ryuk              | yes      |
| 27  | sliver C2         | yes      |
| 28  | Slothful Media    | yes      |
| 29  | smokeloader       | yes      |
| 30  | synack            | no       |
| 31  | TsCookie          | no       |
| 32  | ursnif            | yes      |
| 33  | WarzoneRAT        | yes      |
| 34  | WhisperGate       | yes      |

Table 3: Tested malware samples and their detection

Injecting code into legitimate programs with all three tested C2 frameworks
(Sliver, Havoc, and Mythic) is detected by `Mem2Disk`. Additionally, 21 further
malware samples were successfully detected.

We usually injected into a running `Calculator` app. Figure 1 and 2 show
screenshots of the detections for Havoc C2 and Mythic C2 respectively. The left
side of the screen shows the attacker virtual machine while the right side
shows the victim including the Velociraptor detection. `Process Hacker` was
also displayed to show the PID of the `Calculator` app. As shown in the two
screenshots, both times Velociraptor detects `Calculator` as compromised.

![Figure 1: Havoc C2 Detection](2025-05-05_HavocC2_Calculator_Injection.png)

Figure 1: Havoc C2 Detection

![Figure 2: Mythic C2 Detection](2025-05-05_MythicC2_Calculator_Injection.png)

Figure 2: Mythic C2 Detection

Table 4 shows our full evaluation. Numbers in brackets are the amount
of samples in this category.

|                 | Not-detected | Detected | Total     |
|-----------------|--------------|----------|-----------|
| **Non-malware** |  35% (18)    |  0%  (0) |  35% (18) |
| **Malware**     |  19% (10)    | 46% (24) |  65% (34) |
| **Total**       |  54% (28)    | 46% (24) | 100% (52) |

Table 4: Detection rates (numbers in brackets are amount of samples)

With these results, the true negatives (TN) are 35%, while the false positives
(FP) are 0%. Also, the false negatives (FN) are 19%, and the true positives
(TP) are 46%.

As shown in the equations below, the detection rate is 100.0%, while the
sensitivity is 70.6%, and the accuracy is 80.8%.

{{% math "Detection\ rate = \frac{TP}{TP + FP} \times 100 = \frac{24}{24 + 0} \times 100 = 100.0\%" %}}

{{% math "Sensitivity = \frac{TP}{TP + FN} \times 100 = \frac{24}{24 + 10} \times 100 = 70.6\%" %}}

{{% math "Accuracy = \frac{TN + TP}{TN + TP + FN + FP} \times 100 = \frac{18 + 24}{18 + 24 + 10 + 0} \times 100 = 80.8\%" %}}

Lastly, detections usually ran within 1-5 minutes, sometimes in under
a minute depending on the system hardware. It scales to the maximum
number of systems Velociraptor can handle in parallel (i.e. >10.000
machines).

# 6. Discussion

We tested the technique against available malware, own malware created using
three well-known C2 frameworks, and benign software.

The results are quite promising and we were able to detect state-of- the-art
open source C2 frameworks. This is the first approach we know that scales to
thousands of systems in parallel.

When ignoring relocation offsets and the Velociraptor binary itself, `Mem2Disk`
does not detect many false positives. Occasionally, some Windows system
processes would pop up in the detections, however on a second run of `Mem2Disk`
they usually disappear.

If malware removes itself from RAM temporarily or hooks the functions used by
Velociraptor, it could still hide itself from `Mem2Disk`. We also observed that
some of the false negatives ran pretty quickly, so we suspect that they were
already finished when Velociraptor ran.

However, our approach shows that it is possible to scale RAM analysis up to
multiple systems without prior knowledge which systems might be affected. We
challenge blue teamers around the world to experiment with scalable RAM
detections like with Velociraptor.

# 7. Conclusion

All in all, the blue team just stepped up. We are able to detect injected
implants of common C2 frameworks live in RAM and scalable to thousands of
machines in nearly real-time.

Happy detecting!

# 8. Acknowledgement

We would like to express our gratitude to Prof. Nicolas Wolovick for supporting
this publication with advice and guidance and to Mike Cohen for improving our
VQL code as well as helping us understand the connection between `RVA`,
`BaseOfData` and `ASLR`.
