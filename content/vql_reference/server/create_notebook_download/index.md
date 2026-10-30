---
title: create_notebook_download
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Creates a notebook export zip file.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
notebook_id|Notebook ID to export.|string (required)
filename|The name of the export. If not set this will be named according to the notebook id and timestamp|string

**Required permissions:** `PREPARE_RESULTS`

### Description

Creates a notebook export zip file.

