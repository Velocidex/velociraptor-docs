---
title: proc_dump
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## proc_dump
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|The PID to dump out.|int64 (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">MACHINE_STATE</i>

### Description

Dumps process memory.

Dumps a process into a crashdump. The crashdump file can be opened
with the windows debugger as normal. The plugin returns the filename
of the crash dump which is a temporary file - the file will be removed
when the query completes, so if you want to hold on to it, you should
use the upload() plugin to upload it to the server or otherwise copy
it.


