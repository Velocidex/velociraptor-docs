---
title: rm_client_monitoring
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Remove an artifact from the client monitoring table.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|The name of the artifact to remove from the event table|string (required)
label|Remove the artifact from this label group (default the 'all'  group)|string

**Required permissions:** `COLLECT_CLIENT`

### Description

Remove an artifact from the client monitoring table.

