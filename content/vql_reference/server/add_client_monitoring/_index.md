---
title: add_client_monitoring
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Adds a new artifact to the client monitoring table.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|The name of the artifact to add|string (required)
parameters|A dict of artifact parameters|LazyExpr
label|Add the artifact to this label group (default all)|string

**Required permissions:** `COLLECT_CLIENT`

### Description

Adds a new artifact to the client monitoring table.

