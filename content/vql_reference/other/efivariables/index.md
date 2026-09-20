---
title: efivariables
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Enumerate efi variables.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
namespace|Variable namespace.|string
name|Variable name|string
value|Read variable value|bool

**Required permissions:** `MACHINE_STATE`

### Description

Enumerate efi variables.

