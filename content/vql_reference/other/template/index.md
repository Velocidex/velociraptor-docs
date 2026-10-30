---
title: template
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Expand a Go style template .
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
template|A Go Template compatible string.|string (required)
expansion|An object to be expanded into the template.|ordereddict.Dict (required)
html|Use when the output should be html escaped.|bool
### Description

Expand a Go style template .

