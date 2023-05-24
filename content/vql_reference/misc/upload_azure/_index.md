---
title: upload_azure
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload_azure
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
sas_url|A SAS URL to use for upload to the container.|string (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Upload files to Azure Blob Storage Service.

