---
title: olevba
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Extracts VBA Macros from Office documents.

  This plugin parses the provided files as OLE documents in order to
  recover VB macro code. A single document can have multiple code
  objects, and each such code object is emitted as a row.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file|A list of filenames to open as OLE files.|list of OSPath (required)
accessor|The accessor to use.|string
max_size|Maximum size of file we load into memory.|int64

**Required permissions:** `FILESYSTEM_READ`

### Description

Extracts VBA Macros from Office documents.

This plugin parses the provided files as OLE documents in order to
recover VB macro code. A single document can have multiple code
objects, and each such code object is emitted as a row.


