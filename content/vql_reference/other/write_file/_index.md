---
title: write_file
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Writes a string onto a file.

  This VQL function is a convenience wrapper to the copy() function.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
data|The data to write|string (required)
dest|The destination file to write.|string (required)
permissions|Required permissions (e.g. 'x').|string
append|If true we append to the target file otherwise truncate it|bool
create_directories|If true we ensure the destination directories exist|bool

**Required permissions:** `FILESYSTEM_WRITE`, `FILESYSTEM_READ`

### Description

Writes a string onto a file.

This VQL function is a convenience wrapper to the copy() function.


