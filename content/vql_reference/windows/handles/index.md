---
title: handles
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Enumerate process handles.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
pid|If specified only get handles from these PIDs.|uint64
types|If specified only get handles of this type.|list of string

**Required permissions:** `MACHINE_STATE`

### Description

Enumerate process handles.


