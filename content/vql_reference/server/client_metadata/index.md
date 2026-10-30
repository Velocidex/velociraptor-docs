---
title: client_metadata
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Returns client metadata from the datastore.

  Client metadata is a set of free form key/value data. Artifacts
  may use this metadata or it may simply be used as part of your IR
  processes.

  ### See also

  - [client_set_metadata]({{< ref "/vql_reference/server/client_set_metadata/" >}}):
    Sets client metadata.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id||string (required)

**Required permissions:** `READ_RESULTS`, `SERVER_ADMIN`

### Description

Returns client metadata from the datastore.

Client metadata is a set of free form key/value data. Artifacts
may use this metadata or it may simply be used as part of your IR
processes.

### See also

- [client_set_metadata]({{< ref "/vql_reference/server/client_set_metadata/" >}}):
  Sets client metadata.


