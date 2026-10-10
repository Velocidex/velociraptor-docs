---
title: enumerate_flow
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Enumerate all the files that make up a flow.

  This includes the uploaded files, the result sets and the various
  metadata files that result flow state information.

  This plugin is mostly used for archiving or deleting a flow from
  the filestore.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string

**Required permissions:** `READ_RESULTS`

### Description

Enumerate all the files that make up a flow.

This includes the uploaded files, the result sets and the various
metadata files that result flow state information.

This plugin is mostly used for archiving or deleting a flow from
the filestore.


