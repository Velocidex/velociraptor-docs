---
title: hunt_update
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Update a hunt.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
hunt_id|The hunt to update|string (required)
stop|Stop the hunt|bool
start|Start the hunt|bool
description|Update hunt description|string
expires|Update hunt expiry|time.Time
add_labels|Labels to be added to hunt|list of string
del_labels|Labels to be removed from hunt|list of string

**Required permissions:** `START_HUNT`

### Description

Update a hunt.

