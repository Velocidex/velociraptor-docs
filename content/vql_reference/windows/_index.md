---
title: Windows-only
weight: 20
linkTitle: Windows
sitemap:
  disable: true
no_edit: true
no_children: true
---

Many VQL plugins and functions provide access to the Windows APIs. The
following are only available when running Velociraptor on Windows.
|Plugin/Function|Type|Description|
|-|-|-|
|[amsi](amsi)|Function|AMSI is an interface on windows to scan a string for malware|
|[authenticode](authenticode)|Function|Parses authenticode information from PE files|
|[certificates](certificates)|Plugin|Collect certificate from the system trust store|
|[etw_sessions](etw_sessions)|Plugin|Enumerates all active ETW sessions|
|[handles](handles)|Plugin|Enumerate process handles|
|[interfaces](interfaces)|Plugin|List all active network interfaces using the API|
|[lookupSID](lookupsid)|Function|Get information about the SID|
|[modules](modules)|Plugin|Enumerate Loaded DLLs|
|[partitions](partitions)|Plugin|List all partitions|
|[proc_dump](proc_dump)|Plugin|Dumps process memory|
|[proc_yara](proc_yara)|Plugin|Scan processes using yara rules|
|[read_reg_key](read_reg_key)|Plugin|This is a convenience plugin which applies the globs to the registry|
|[reg_rm_key](reg_rm_key)|Function|Removes a key and all its values from the registry|
|[reg_rm_value](reg_rm_value)|Function|Removes a value in the registry|
|[reg_set_value](reg_set_value)|Function|Set a value in the registry|
|[srum_lookup_id](srum_lookup_id)|Function|Lookup a SRUM id|
|[threads](threads)|Plugin|Enumerate threads in a process|
|[token](token)|Function|Extract process token|
|[users](users)|Plugin|Display information about workstation local users|
|[vad](vad)|Plugin|Enumerate process memory regions|
|[winobj](winobj)|Plugin|Enumerate The Windows Object Manager namespace|
|[winpmem](winpmem)|Function|Uses the `winpmem` driver to take a memory image|
|[wmi](wmi)|Plugin|Execute simple WMI queries synchronously|
