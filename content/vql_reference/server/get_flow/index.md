---
title: get_flow
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Gets flow details.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string
summary|If specified we fetch just the basic summary of the flow. This is a bit faster.|bool

**Required permissions:** `COLLECT_CLIENT`, `COLLECT_SERVER`

### Description

Gets flow details.

