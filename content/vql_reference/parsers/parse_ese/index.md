---
title: parse_ese
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Opens an ESE file and dump a table.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file||OSPath (required)
accessor|The accessor to use.|string
table|A table name to dump|string (required)

**Required permissions:** `FILESYSTEM_READ`

### Description

Opens an ESE file and dump a table.

