---
title: threads
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Enumerate threads in a process.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
pid|The PID to get the thread for.|int64 (required)

**Required permissions:** `MACHINE_STATE`

### Description

Enumerate threads in a process.

