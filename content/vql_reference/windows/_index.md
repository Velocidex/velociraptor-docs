---
title: Windows Specific
weight: 20
linktitle: Windows
index: true
---

Many VQL plugins and functions provide access to the Windows
APIs. The following are only available when running on Windows.


<div class="vql_item"></div>


## appcompatcache
<span class='vql_type pull-right'>Plugin</span>

Parses the appcompatcache.



<div class="vql_item"></div>


## authenticode
<span class='vql_type pull-right'>Function</span>

This plugin uses the Windows API to extract authenticode signature
details from PE files.

Since we use the windows API this can only work with the "file"
accessor.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
accessor|The accessor to use.|string
filename|The filename to parse.|string (required)
verbose|Set to receive verbose information about all the certs.|bool



<div class="vql_item"></div>


## certificates
<span class='vql_type pull-right'>Plugin</span>

Collect certificate from the system trust store.



<div class="vql_item"></div>


## dns
<span class='vql_type pull-right'>Plugin</span>

Monitor dns queries.

This plugin opens a raw socket and monitors network traffic for
DNS questions and answers.

{{% notice note %}}

When Velociraptor attempts to open a raw socket, sometimes Windows
Defender treats that as suspicious behavior and quarantines the
Velociraptor binary. This can be avoided by signing the binary which
signals to Windows Defender that the binary is legitimate.

If you do not intend to build Velociraptor from source, use the
official signed Velociraptor binaries which should not trigger alerts
from Windows Defender.

{{% /notice %}}




<div class="vql_item"></div>


## handles
<span class='vql_type pull-right'>Plugin</span>

Enumerate process handles.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)



<div class="vql_item"></div>


## interfaces
<span class='vql_type pull-right'>Plugin</span>

List all active interfaces.



<div class="vql_item"></div>


## lookupSID
<span class='vql_type pull-right'>Function</span>

Get information about the SID.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
sid|A SID to lookup using LookupAccountSid |string (required)



<div class="vql_item"></div>


## modules
<span class='vql_type pull-right'>Plugin</span>

Enumerate Loaded DLLs.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)



<div class="vql_item"></div>


## netstat
<span class='vql_type pull-right'>Plugin</span>

Collect network information.



<div class="vql_item"></div>


## partitions
<span class='vql_type pull-right'>Plugin</span>

List all partititions



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
all|If specified list all Partitions|bool



<div class="vql_item"></div>


## proc_dump
<span class='vql_type pull-right'>Plugin</span>

Dumps process memory.

Dumps a process into a crashdump. The crashdump file can be opened
with the windows debugger as normal. The plugin returns the filename
of the crash dump which is a temporary file - the file will be removed
when the query completes, so if you want to hold on to it, you should
use the upload() plugin to upload it to the server or otherwise copy
it.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)



<div class="vql_item"></div>


## proc_yara
<span class='vql_type pull-right'>Plugin</span>

Scan processes using yara rules.

This plugin uses yara's own engine to scan process memory for the signatures.

{{% notice note %}}

Process memory access depends on having the [SeDebugPrivilege](https://support.microsoft.com/en-au/help/131065/how-to-obtain-a-handle-to-any-process-with-sedebugprivilege) which depends on how Velociraptor was started. Even when running as System, some processes are not accessible.

{{% /notice %}}




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
rules|Yara rules|string (required)
pid|The pid to scan|int (required)
context|Return this many bytes either side of a hit|int
key|If set use this key to cache the  yara rules.|string



<div class="vql_item"></div>


## read_reg_key
<span class='vql_type pull-right'>Plugin</span>

This is a convenience plugin which applies the globs to the registry
accessor to find keys. For each key the plugin then lists all the
values within it, and returns a row which has the value names as
columns, while the cells contain the value's stat info (and data
content available in the `Data` field).

This makes it easier to access a bunch of related values at once.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
globs|Glob expressions to apply.|list of string (required)
accessor|The accessor to use.|string



<div class="vql_item"></div>


## srum_lookup_id
<span class='vql_type pull-right'>Function</span>

Lookup a SRUM id.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file||string (required)
accessor|The accessor to use.|string
id||int64 (required)



<div class="vql_item"></div>


## token
<span class='vql_type pull-right'>Function</span>

Extract process token.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|The PID to get the token for.|int64 (required)



<div class="vql_item"></div>


## users
<span class='vql_type pull-right'>Plugin</span>

Display information about workstation local users. This is obtained through the NetUserEnum() API.



<div class="vql_item"></div>


## vad
<span class='vql_type pull-right'>Plugin</span>

Enumerate process memory regions.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)



<div class="vql_item"></div>


## winobj
<span class='vql_type pull-right'>Plugin</span>

Enumerate The Windows Object Manager namespace.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Object namespace path.|string



<div class="vql_item"></div>


## wmi
<span class='vql_type pull-right'>Plugin</span>

Execute simple WMI queries synchronously.

This plugin issues a WMI query and returns its rows directly. The
exact format of the returned row depends on the WMI query issued.

This plugin creates a bridge between WMI and VQL and it is a very
commonly used plugin for inspecting the state of windows systems.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|The WMI query to issue.|string (required)
namespace|The WMI namespace to use (ROOT/CIMV2)|string

