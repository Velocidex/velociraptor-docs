---
title: "Forensic Analysis"
date: 2021-06-12T21:56:33Z
draft: false
weight: 40
---

In the previous sections we learned the syntax of VQL. But VQL is not
useful without a good set of plugins that make DFIR work
possible. Velociraptor's strength lies in the wide array of VQL
plugins and functions that are geared towards making DFIR
investigations and detections effective.

{{% children "description"=true "style"="h3" %}}


Velociraptor
Digging Deeper!
1

Forensic Analysis with VQL Pt2

Digging even deeper in Windows
2

Module overview
Velociraptor implements many forensic capabilities in VQL
This module will focus on typical forensic analysis and deep inspection capabilities. We will learn how to put the capabilities together to produce effective artifacts.
We will use the Mitre Att&ck framework for guidance.


3

Evidence of execution
4


29
59

Conclusions
In this module we learned about more ways we can recover information from a Windows system
The SRUM database contains system telemetry about program execution. This can establish that binaries ran on the system.
Other methods include prefetch files, amcache, BAM etc.
83

Conclusions
Windows event logs are critical sources of information
We have looked at the internals of Windows Event Logs and discovered that event messages are not stored in the log files.
Velociraptor can enrich event logs automatically by parsing messages out of system Dlls
Velociraptor can also watch the event logs in and event query and respond automatically to certain events.
84

Conclusions
Windows Machine Instrumentation (WMI) is a powerful OS level capability for exposing system state information.
Velociraptor provides a WMI bridge allowing VQL artifacts to directly query the WMI system.
This can be used to enrich results with file data and metadata
WMI eventing is also exposed providing a way to write event driven VQL queries that respond to WMI exposed events.
85



Conclusions
In this module we learned about:
Globbing is a powerful method to search files by filename patterns
Velociraptor extends the concept of filesystems by providing Accessors. Therefore all plugins can operate on file-like objects like compressed archives, registry keys, MFT entries and raw parsed NTFS files.
88

Conclusions
Velociraptor exposes deep level filesystem analysis
NTFS analysis can recover evidence of deleted files
Timestomping can be uncovered using additional low level NTFS analysis.
USN Journal shows historical file manipulation
Velociraptor exposes Volume Shadow Copies via the NTFS analysis engine.
89
