---
title: vfs_ls
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  List directory and build a VFS object.

  This plugin is probably only useful as part of the
  System.VFS.ListDirectory artifact.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|The directory to refresh.|OSPath
components|Alternatively a list of path components can be given.|list of string
accessor|An accessor to use.|string
depth|Depth of directory to list (default 0).|int64

**Required permissions:** `FILESYSTEM_READ`

### Description

List directory and build a VFS object.

This plugin is probably only useful as part of the
System.VFS.ListDirectory artifact.


