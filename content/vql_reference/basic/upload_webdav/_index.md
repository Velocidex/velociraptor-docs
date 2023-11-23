---
title: upload_webdav
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload_webdav
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name that the file should have on the server|string
accessor|The accessor to use|string
url|The WebDAV url|string (required)
basic_auth_user|The username to use in HTTP basic auth|string
basic_auth_password|The password to use in HTTP basic auth|string
noverifycert|Skip TLS Verification (deprecated in favor of SkipVerify)|bool
skip_verify|Skip TLS Verification|bool
user_agent|If specified, set a HTTP User-Agent.|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Upload files to a WebDAV server.

