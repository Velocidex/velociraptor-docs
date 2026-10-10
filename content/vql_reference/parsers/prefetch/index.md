---
title: prefetch
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parses a prefetch file.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|A list of event log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Parses a prefetch file.

