---
title: timeline_delete
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Delete a super timeline.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
timeline|Supertimeline to delete.|string (required)
notebook_id|The notebook ID the timeline is stored in.|string
name|Name/Id of child timeline to delete. If not specified deletes the entire timeline|string

**Required permissions:** `NOTEBOOK_EDITOR`

### Description

Delete a super timeline.

