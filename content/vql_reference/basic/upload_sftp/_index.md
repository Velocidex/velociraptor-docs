---
title: upload_sftp
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload_sftp
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server (may contain the path)|string
user|The username to connect to the endpoint with|string (required)
path|Path on server to upload file to (will be prepended to name)|string
accessor|The accessor to use|string
privatekey|The private key to use|string (required)
endpoint|The Endpoint to use including port number (e.g. 192.168.1.1:22 )|string (required)
hostkey|Host key to verify. Blank to disable|string

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_READ</span>

### Description

Upload files to SFTP.

