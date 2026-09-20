---
title: uploads
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Retrieve information about a flow's uploads.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string
flow_id|A flow ID (client or server artifacts)|string
hunt_id|A hunt ID|string
notebook_id|A notebook ID|string

**Required permissions:** `READ_RESULTS`

### Description

Retrieve information about a flow's uploads.

