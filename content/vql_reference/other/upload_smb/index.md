---
title: upload_smb
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Upload files using the SMB file share protocol.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|OSPath
accessor|The accessor to use|string
username|The SMB username to login as (if not provided we use the SMB_CREDENTIALS env)|string
password|The SMB password to login as (if not provided we use the SMB_CREDENTIALS env)|string
server_address|The SMB server address and optionally port followed by the share name (e.g. \\192.168.1.1:445\ShareName)|string (required)

**Required permissions:** `FILESYSTEM_READ`, `NETWORK`

### Description

Upload files using the SMB file share protocol.

