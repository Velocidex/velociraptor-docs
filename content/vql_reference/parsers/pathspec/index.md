---
title: pathspec
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Create a structured path spec to pass to certain accessors.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
DelegateAccessor|An accessor to use.|string
DelegatePath|A delegate to pass to the accessor.|string
Delegate|A delegate to pass to the accessor (must be another pathspec).|LazyExpr
Path|A path to open.|Any
parse|Alternatively parse the pathspec from this string.|string
path_type|Type of path this is (windows,linux,registry,ntfs).|string
accessor|The accessor to use to parse the path with|string
### Description

Create a structured path spec to pass to certain accessors.

