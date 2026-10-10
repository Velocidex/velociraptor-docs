---
title: regex_replace
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Search and replace a string with a regexp. Note you can use $1 to replace the capture string.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
source|The source string to replace.|string (required)
replace|The substitute string.|string
replace_lambda|Optionally the replacement can be a lambda.|string
re|A regex to apply|string (required)
### Description

Search and replace a string with a regexp. Note you can use $1 to replace the capture string.

