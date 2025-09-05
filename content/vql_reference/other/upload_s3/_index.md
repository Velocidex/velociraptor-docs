---
title: upload_s3
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload_s3
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
region|The region the bucket is in|string
credentials_key|The AWS key credentials to use|string
credentials_secret|The AWS secret credentials to use|string
credentials_token|The AWS session token to use (only needed for temporary credentials)|string
endpoint|The Endpoint to use|string
serverside_encryption|The server side encryption method to use|string
kms_encryption_key|The server side KMS key to use|string
s3upload_root|Prefix for the S3 object|string
skip_verify|Skip TLS Verification|bool
secret|Alternatively use a secret from the secrets service. Secret must be of type 'AWS S3 Creds'|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">NETWORK</span>
<span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Upload files to S3.

