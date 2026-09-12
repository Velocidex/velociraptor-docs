---
title: upload_sftp
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Upload files to SFTP.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

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

**Required permissions:** `FILESYSTEM_READ`, `NETWORK`

### Description

Upload files to SFTP.

