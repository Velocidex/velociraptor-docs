---
title: stat
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Get file information. Unlike glob() this does not support wildcards.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|One or more files to open.|OSPath (required)
accessor|An accessor to use.|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Get file information. Unlike glob() this does not support wildcards.

