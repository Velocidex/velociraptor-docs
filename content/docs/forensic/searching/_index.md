---
title: "Searching Content"
date: 2021-06-17T02:30:41Z
draft: false
weight: 30
---

A powerful DFIR technique is searching bulk data for patterns. Some
examples include:

* Searching for CC data in process memory
* Searching for URLs in process memory
* Searching binaries for malware signatures
* Searching registry for patterns

Bulk searching helps to identify evidence without needing to parse file formats

## YARA - The swiss army knife

YARA is a powerful keyword scanner
Uses rules designed to identify binary patterns in bulk data
YARA is optimized to scan for many rules simultaneously.
Velociraptor supports YARA scanning of bulk data (via accessors) and memory.

yara() and proc_yara()
28

YARA rules
rule X {
   strings:
       $a = “hello” nocase
       $b = “Goodbye” wide
       $c = /[a-z]{5,10}[0-9]/i

   condition:
       $a and ($b or $c)
}
29

Exercise: drive by download
You suspect a user was compromised by a drive by download (i.e. they clicked and downloaded malware delivered by mail, ads etc).
You think the user used the Edge browser but you have no idea of the internal structure of the browser cache/history etc.
Write an artifact to extract potential URLs from the Edge browser directory (also where is it?)
30

Step 1: Figure out where to look
31

32
Looks like somewhere in C:\Users\<name>\AppData\Local\Microsoft\Edge\**

Step 2: Recover URLs
We don't exactly understand how Edge stores data but we know roughly what a URL is supposed to look like!
Yara is our sledgehammer !

rule URL {
  strings: $a = /https?:\\/\\/[a-z0-9\\/+&#:\\?.-]+/i
  condition: any of them
}
33

Step 3: Let’s do this!
34

35

36

37
YARA best practice
You can get yara rules from many sources (threat intel, blog posts etc)
YARA is really a first level triage tool:
Depending on signature  many false positives expected
Some signatures are extremely specific so make a great signal
Try to collect additional context around the hits to eliminate false positives.
Yara scanning is relatively expensive! consider more targeted glob expressions and client side throttling since usually YARA scanning is not time critical.


Uploading files
38

Collecting files
Velociraptor can collect file data.
Over the network
Locally to a collection zip file.
Driven by VQL

The upload() VQL function copies a file using an accessor to the relevant container
39

Exercise
Collect all executables in users’ home directory


Write your own VQL by combining glob() and upload()
40

41
