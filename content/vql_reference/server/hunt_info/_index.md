---
title: hunt_info
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Retrieve the hunt information.

  This function is a convenience function to the full hunts()
  plugin, and can retrieve the hunt information for a specific hunt
  id. As a convenience, the function will also accept a flow id for
  flows which were launched by the hunt. These flow IDs have a
  specific format indicating they were launched from a hunt.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
hunt_id|Hunt Id to look up or a flow id created by that hunt (e.g. F.CRUU3KIE5D73G.H ).|string

**Required permissions:** `READ_RESULTS`

### Description

Retrieve the hunt information.

This function is a convenience function to the full hunts()
plugin, and can retrieve the hunt information for a specific hunt
id. As a convenience, the function will also accept a flow id for
flows which were launched by the hunt. These flow IDs have a
specific format indicating they were launched from a hunt.


