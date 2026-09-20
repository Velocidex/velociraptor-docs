---
title: parse_yaml
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parse yaml into an object.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|Yaml Filename|OSPath (required)
accessor|File accessor|string
schema|Json schema to use for validation.|list of string

**Required permissions:** `FILESYSTEM_READ`

### Description

Parse yaml into an object.

