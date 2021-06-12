---
title: Windows Specific Functionality
weight: 20
linktitle: Windows
index: true
---

Many VQL plugins and functions provide access to the Windows
APIs. The following are only available when running on Windows.

## appcompatcache
<span class='vql_type pull-right'>Plugin</span>

Parses the appcompatcache.


## authenticode
<span class='vql_type pull-right'>Function</span>

This plugin uses the Windows API to extract authenticode signature
details from PE files.

Since we use the windows API this can only work with the "file"
accessor.


Arg | Description | Type
----|-------------|-----
accessor|The accessor to use.|string
filename|The filename to parse.|string (required)
verbose|Set to receive verbose information about all the certs.|bool


## certificates
<span class='vql_type pull-right'>Plugin</span>

Collect certificate from the system trust store.


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



## handles
<span class='vql_type pull-right'>Plugin</span>

Enumerate process handles.

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)


## interfaces
<span class='vql_type pull-right'>Plugin</span>

List all active interfaces.


## lookupSID
<span class='vql_type pull-right'>Function</span>

Get information about the SID.

Arg | Description | Type
----|-------------|-----
sid|A SID to lookup using LookupAccountSid |string (required)


## modules
<span class='vql_type pull-right'>Plugin</span>

Enumerate Loaded DLLs.

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)


## netstat
<span class='vql_type pull-right'>Plugin</span>

Collect network information.


## partitions
<span class='vql_type pull-right'>Plugin</span>

List all partititions

Arg | Description | Type
----|-------------|-----
all|If specified list all Partitions|bool


## proc_dump
<span class='vql_type pull-right'>Plugin</span>

Dumps process memory.

Dumps a process into a crashdump. The crashdump file can be opened
with the windows debugger as normal. The plugin returns the filename
of the crash dump which is a temporary file - the file will be removed
when the query completes, so if you want to hold on to it, you should
use the upload() plugin to upload it to the server or otherwise copy
it.


Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)


## proc_yara
<span class='vql_type pull-right'>Plugin</span>

Scan processes using yara rules.

This plugin uses yara's own engine to scan process memory for the signatures.

{{% notice note %}}

Process memory access depends on having the [SeDebugPrivilege](https://support.microsoft.com/en-au/help/131065/how-to-obtain-a-handle-to-any-process-with-sedebugprivilege) which depends on how Velociraptor was started. Even when running as System, some processes are not accessible.

{{% /notice %}}


Arg | Description | Type
----|-------------|-----
rules|Yara rules|string (required)
pid|The pid to scan|int (required)
context|Return this many bytes either side of a hit|int
key|If set use this key to cache the  yara rules.|string


## read_reg_key
<span class='vql_type pull-right'>Plugin</span>

This is a convenience plugin which applies the globs to the registry
accessor to find keys. For each key the plugin then lists all the
values within it, and returns a row which has the value names as
columns, while the cells contain the value's stat info (and data
content available in the `Data` field).

This makes it easier to access a bunch of related values at once.


Arg | Description | Type
----|-------------|-----
globs|Glob expressions to apply.|list of string (required)
accessor|The accessor to use.|string


## srum_lookup_id
<span class='vql_type pull-right'>Function</span>

Lookup a SRUM id.

Arg | Description | Type
----|-------------|-----
file||string (required)
accessor|The accessor to use.|string
id||int64 (required)


## token
<span class='vql_type pull-right'>Function</span>

Extract process token.

Arg | Description | Type
----|-------------|-----
pid|The PID to get the token for.|int64 (required)


## users
<span class='vql_type pull-right'>Plugin</span>

Display information about workstation local users. This is obtained through the NetUserEnum() API.


## vad
<span class='vql_type pull-right'>Plugin</span>

Enumerate process memory regions.

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)


## winobj
<span class='vql_type pull-right'>Plugin</span>

Enumerate The Windows Object Manager namespace.

Arg | Description | Type
----|-------------|-----
path|Object namespace path.|string


## wmi
<span class='vql_type pull-right'>Plugin</span>

Execute simple WMI queries synchronously.

This plugin issues a WMI query and returns its rows directly. The
exact format of the returned row depends on the WMI query issued.

This plugin creates a bridge between WMI and VQL and it is a very
commonly used plugin for inspecting the state of windows systems.


Arg | Description | Type
----|-------------|-----
query|The WMI query to issue.|string (required)
namespace|The WMI namespace to use (ROOT/CIMV2)|string

