---
title: repack
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## repack
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
target|The name of the target OS to repack (VelociraptorWindows, VelociraptorLinux, VelociraptorDarwin)|string
exe|Alternative a path to the executable to repack|OSPath
accessor|The accessor to use to read the file.|string
binaries|List of tool names that will be repacked into the target|list of string
config|The config to be repacked in the form of a json or yaml string|string (required)
upload_name|The name of the upload to create|string (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_SERVER</i>

### Description

Repack and upload a repacked binary or MSI to the server.

