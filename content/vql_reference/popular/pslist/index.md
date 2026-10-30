---
title: pslist
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Enumerate running processes.

  When specifying the pid this operation is much faster so if you are
  interested in specific processes, the pid should be
  specified. Otherwise, the plugin returns all processes one on each
  row.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
pid|A process ID to list. If not provided list all processes.|int64

**Required permissions:** `MACHINE_STATE`

### Description

Enumerate running processes.

When specifying the pid this operation is much faster so if you are
interested in specific processes, the pid should be
specified. Otherwise, the plugin returns all processes one on each
row.


