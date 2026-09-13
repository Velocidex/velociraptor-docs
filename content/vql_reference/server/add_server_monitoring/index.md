---
title: add_server_monitoring
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Adds a new artifact to the server monitoring table.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|The name of the artifact to add|string (required)
parameters|A dict of artifact parameters|LazyExpr

**Required permissions:** `COLLECT_SERVER`

### Description

Adds a new artifact to the server monitoring table.

