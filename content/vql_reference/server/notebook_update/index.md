---
title: notebook_update
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Update a notebook metadata.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
notebook_id|The id of the notebook to update|string (required)
description|The description of the notebook|string
collaborators|A list of users to share the notebook with.|list of string
public|If set the notebook will be public.|bool
attachment|Raw data of an attachment to be added to the notebook|string
attachment_filename|The name of the attachment|string

**Required permissions:** `COLLECT_SERVER`

### Description

Update a notebook metadata.

