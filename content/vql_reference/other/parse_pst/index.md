---
title: parse_pst
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parse a PST file and extract email data.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|The PST file to parse.|OSPath (required)
accessor|The accessor to use|string
raw|If set we emit the raw message object for all objects|bool

**Required permissions:** `FILESYSTEM_READ`

### Description

Parse a PST file and extract email data.

