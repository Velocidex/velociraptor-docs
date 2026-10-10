---
title: upload_azure
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Upload files to Azure Blob Storage Service.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
sas_url|A SAS URL to use for upload to the container.|string (required)

**Required permissions:** `FILESYSTEM_READ`, `NETWORK`

### Description

Upload files to Azure Blob Storage Service.

