---
title: Windows Specific
weight: 20
linktitle: Windows
index: true
no_edit: true
no_children: true
---

Many VQL plugins and functions provide access to the Windows
APIs. The following are only available when running on Windows.
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[amsi](amsi)|<span class='vql_type'>Function</span>|AMSI is an interface on windows to scan a string for malware|
|[appcompatcache](appcompatcache)|<span class='vql_type'>Plugin</span>|Parses the appcompatcache|
|[authenticode](authenticode)|<span class='vql_type'>Function</span>|Parses authenticode information from PE files|
|[certificates](certificates)|<span class='vql_type'>Plugin</span>|Collect certificate from the system trust store|
|[dns](dns)|<span class='vql_type'>Plugin</span>|Monitor dns queries|
|[handles](handles)|<span class='vql_type'>Plugin</span>|Enumerate process handles|
|[interfaces](interfaces)|<span class='vql_type'>Plugin</span>|List all active network interfaces using the API|
|[lookupSID](lookupSID)|<span class='vql_type'>Function</span>|Get information about the SID|
|[modules](modules)|<span class='vql_type'>Plugin</span>|Enumerate Loaded DLLs|
|[partitions](partitions)|<span class='vql_type'>Plugin</span>|List all partitions|
|[proc_dump](proc_dump)|<span class='vql_type'>Plugin</span>|Dumps process memory|
|[proc_yara](proc_yara)|<span class='vql_type'>Plugin</span>|Scan processes using yara rules|
|[read_reg_key](read_reg_key)|<span class='vql_type'>Plugin</span>|This is a convenience plugin which applies the globs to the registry|
|[srum_lookup_id](srum_lookup_id)|<span class='vql_type'>Function</span>|Lookup a SRUM id|
|[token](token)|<span class='vql_type'>Function</span>|Extract process token|
|[users](users)|<span class='vql_type'>Plugin</span>|Display information about workstation local users|
|[vad](vad)|<span class='vql_type'>Plugin</span>|Enumerate process memory regions|
|[winobj](winobj)|<span class='vql_type'>Plugin</span>|Enumerate The Windows Object Manager namespace|
|[wmi](wmi)|<span class='vql_type'>Plugin</span>|Execute simple WMI queries synchronously|
