---
title: upload_smb
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload_smb
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|OSPath
accessor|The accessor to use|string
username|The SMB username to login as|string (required)
password|The SMB password to login as|string (required)
server_address|The SMB server address and optionally port followed by the share name (e.g. \\192.168.1.1:445\ShareName)|string (required)

### Description

Upload files using the SMB file share protocol.

