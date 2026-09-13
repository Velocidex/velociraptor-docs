---
title: plist
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parses a plist file.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file|A list of files to parse.|list of OSPath (required)
accessor|The accessor to use.|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Parses a plist file.

