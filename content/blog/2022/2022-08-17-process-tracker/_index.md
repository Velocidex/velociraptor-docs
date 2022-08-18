---
title: "The Velociraptor process tracker"
description: |
   Since 0.6.6, Velociraptor comes with a process tracker. What is it and how can it be used?
tags:
 - VQL
author: "Mike Cohen"
date: 2022-08-15
noindex: true
---

One of the advantages of running Velociraptor on the endpoint
constantly is the ability to monitor the endpoint using [client
monitoring queries]({{% ref "/docs/client_monitoring/" %}}). Gaining
visibility to volatile information is critical to reconstructing past
activity and responding to new threats.

Commonly, attackers subvert the endpoint by creating new
processes. For example, an attacker might execute malicious office
macros as their initial compromise, but then follow it by launching
PowerShell or C# code - or commonly Living Off The Land binaries
(`LOLBins`).

We can use information about processes to identify suspicious
processes which may represent malicious activity. In the next example
I will explore a typical case and how it can be investigated using
Velociraptor.


## A Typical intrusion

A common lateral movement methodology is using `PsExec.exe` to create
a system level service (usually remotely). I will run the following commands to emulate typical attacker activities:

```
psexec.exe /s powershell
ping www.google.com
curl -o script.ps1 https://www.google.com/
notepad.exe
```

First I create a system level shell with `PsExec.exe`, then I perform
some reconnaissance on the network. Then I download a tool from a
remote system. Finally I run my malicious process (in this case I use
`notepad.exe` but in real life this will be some backdoor like `Cobalt
Strike`).

## Responding to this system.

For this example, suppose I was able to identify the malicious process
(`notepad.exe`) using other means (for example the
`Windows.Detection.Yara.Process` artifact by scanning process memory).

Now I need to get more context about this process:

1. Where did it come from?
2. Who stared it and when?
3. What other activity was done around the time the process was started?

To answer the first question we need to see which process was the
parent of the malicious process (and construct the full call chain).

For this example I will use [Process Hacker](https://processhacker.sourceforge.io/) - a very popular GUI for inspecting processes.

![Process Hacker output of our suspicious process](process_hacker.png)

Normally Process Hacker displays processes in a tree form - we can see
which process spawned each process. But in this case, there is no
parent shown for `notepad.exe`. Closer inspection shows that the
parent process has actually exited, so Process Hacker has no further
information about it.

This limitation of process inspection is central to live triage - the
API can not provide any information about processes that have already
exited. Therefore, parent/child relationships are broken.

## Using Velociraptor to gather process context

Now, I will use Velociraptor's `Generic.System.Pstree` artifact to
reconstruct the process call chain of all processes on the system.

![Velociraptors Generic.System.Pstree artifact can clearly show the call chain](pstree.png)

Velociraptor's `Generic.System.Pstree` artifact clearly shows the full
call chain - the process was started through a `PSEXESVC.exe` service
and powershell. This additional context shines light on the initial intrusion pathway.

Next I will use the `Generic.System.ProcessSiblings` artifact to see
the siblings of the malicious process - i.e. those processes that were
started by the same parent
