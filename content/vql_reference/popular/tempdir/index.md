---
title: tempdir
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Create a temporary directory. The directory will be removed when the query ends.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
remove_last|If set we delay removal as much as possible.|bool

**Required permissions:** `FILESYSTEM_WRITE`

### Description

Create a temporary directory. The directory will be removed when the query ends.

