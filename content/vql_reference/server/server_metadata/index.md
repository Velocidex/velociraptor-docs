---
title: server_metadata
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Returns server metadata from the datastore. Server metadata is a
  set of free form key/value data

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
metadata|A dict containing metadata. If not specified we use kwargs.|ordereddict.Dict
`**`|Free Form Args|

**Required permissions:** `SERVER_ADMIN`

### Description

Returns server metadata from the datastore. Server metadata is a
set of free form key/value data


