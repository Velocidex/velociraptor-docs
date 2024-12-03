---
title: authenticode
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## authenticode
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
accessor|The accessor to use.|string
filename|The filename to parse.|OSPath (required)
verbose|Set to receive verbose information about all the certs.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Parses authenticode information from PE files.

On windows, the function will also use the windows API to determine
if the binary is trusted by the system.


