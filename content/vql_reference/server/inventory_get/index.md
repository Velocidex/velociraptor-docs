---
title: inventory_get
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Get tool info from inventory service.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
tool||string (required)
version||string
probe|If specified we only probe the tool definition without materializing|bool

**Required permissions:** `SERVER_ADMIN`

### Description

Get tool info from inventory service.

