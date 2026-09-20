---
title: hunt_delete
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Delete a hunt. 
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
hunt_id||string (required)
really_do_it||bool
workers|Delete with this many workers (default 2)|int64
archive|Set this to only archive the hunt - it will still be accessible but will be hidden from the GUI|bool

**Required permissions:** `SERVER_ADMIN`

### Description

Delete a hunt. 

