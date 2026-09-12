---
title: org_delete
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Deletes an Org from the server.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
org|The org ID to delete.|string (required)
really_do_it|If not specified, just show what org will be removed|bool

**Required permissions:** `ORG_ADMIN`

### Description

Deletes an Org from the server.

