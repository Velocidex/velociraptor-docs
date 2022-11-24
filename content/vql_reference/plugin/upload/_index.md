---
title: upload
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload
<span class='vql_type pull-right page-header'>Function</span>



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

### Description

Upload a file to the upload service. For a Velociraptor client this
will upload the file into the flow and store it in the server's file store.

If Velociraptor is run locally the file will be copied to the
`--dump_dir` path or added to the triage evidence container.




<div class="vql_item"></div>


## upload
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
files|A list of files to upload|list of string (required)
accessor|The accessor to use|string
mtime|Modified time to record|Any

### Description

Upload files to the server.

This plugin uploads the specified file to the server. If Velociraptor
is run locally the file will be copied to the `--dump_dir` path or
added to the triage evidence container.

This functionality is also available using the upload() function which
might be somewhat easier to use.


