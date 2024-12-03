---
title: upload_gcs
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload_gcs
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
project|The project to upload to|string (required)
credentials|The credentials to use|string (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Upload files to GCS.

