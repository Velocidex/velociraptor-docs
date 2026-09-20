---
title: parse_recyclebin
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parses a $I file found in the $Recycle.Bin
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|Files to be parsed.|list of OSPath (required)
accessor|The accessor to use.|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Parses a $I file found in the $Recycle.Bin

