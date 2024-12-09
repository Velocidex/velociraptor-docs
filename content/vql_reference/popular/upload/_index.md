---
title: upload
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|OSPath
accessor|The accessor to use|string
mtime|Modified time to record|Any
atime|Access time to record|Any
ctime|Change time to record|Any
btime|Birth time to record|Any

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Upload a file to the upload service. For a Velociraptor client this
will upload the file into the flow and store it in the server's file store.

If Velociraptor is run locally the file will be copied to the
`--dump_dir` path or added to the triage evidence container.


