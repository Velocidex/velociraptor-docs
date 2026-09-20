---
title: all
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Returns TRUE if all items are true.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
items|The items to consider. Can be an array, subquery or stored query. Will only be lazily evaluated!|Any (required)
filter|A callback to consider each item|Lambda
regex|Optionally one or more regex can be provided for convenience|list of string
### Description

Returns TRUE if all items are true.

