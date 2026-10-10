---
title: remap
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Apply a remapping configuration to the root scope.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
config|A Valid remapping configuration in YAML format|string (required)
copy|Accessors to copy to the new scope|list of string
clear|If set we clear all accessors from the device manager|bool
### Description

Apply a remapping configuration to the root scope.

