---
title: xattr
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Query a file for the specified extended attribute.

  If no attributes are provided, this function will return all extended attributes
  for the file.

  Please note: this API is not reliable, so please provided extended attributes
  where possible.

  Note: This function only works on Mac and Linux.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|Filename to inspect.|OSPath (required)
attribute|Attribute to collect. |list of string
accessor|File accessor|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Query a file for the specified extended attribute.

If no attributes are provided, this function will return all extended attributes
for the file.

Please note: this API is not reliable, so please provided extended attributes
where possible.

Note: This function only works on Mac and Linux.


