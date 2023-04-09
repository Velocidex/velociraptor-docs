---
title: upload_s3
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload_s3
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
region|The region the bucket is in|string (required)
credentialskey|The AWS key credentials to use|string
credentialssecret|The AWS secret credentials to use|string
endpoint|The Endpoint to use|string
serversideencryption|The server side encryption method to use|string
noverifycert|Skip TLS Verification (deprecated in favor of SkipVerify)|bool
skip_verify|Skip TLS Verification|bool

### Description

Upload files to S3.

