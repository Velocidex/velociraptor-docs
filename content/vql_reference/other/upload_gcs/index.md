---
title: upload_gcs
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Upload files to GCS.

  NOTE: This plugin is optional and not included by default from
  Version 0.76 on. Use the `upload_s3()` plugin instead.

  You can read how to [How To Set Up A GCS Bucket For File Uploads](https://docs.velociraptor.app/knowledge_base/tips/setup_gcs_storage)

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
project|The project to upload to|string (required)
credentials|The credentials to use|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Upload files to GCS.

NOTE: This plugin is optional and not included by default from
Version 0.76 on. Use the `upload_s3()` plugin instead.

You can read how to [How To Set Up A GCS Bucket For File Uploads](https://docs.velociraptor.app/knowledge_base/tips/setup_gcs_storage)


