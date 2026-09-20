---
title: parse_json_array
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parses events from a line oriented json file.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
data|Json encoded string.|string (required)
schema|Json schema to use for validation.|list of string
### Description

Parse a JSON string into an array.

This function is similar to `parse_json()` but works for a JSON list
instead of an object.




{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
data|Json encoded string.|string (required)
schema|Json schema to use for validation.|list of string
### Description

Parses events from a line oriented json file.

