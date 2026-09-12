---
title: server_set_metadata
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Sets server metadata. Server metadata is a set of free form
  key/value data, usually used for configuration of artifacts.

  For existing keys, the value is overwritten. Setting a metadata
  key with a `NULL` value deletes that entry.

  ### Example

  ```vql
  SELECT server_set_metadata(`Slack Token`="X12233")
  FROM scope()
  ```

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
metadata|A dict containing metadata. If not specified we use kwargs.|ordereddict.Dict
### Description

Sets server metadata. Server metadata is a set of free form
key/value data, usually used for configuration of artifacts.

For existing keys, the value is overwritten. Setting a metadata
key with a `NULL` value deletes that entry.

### Example

```vql
SELECT server_set_metadata(`Slack Token`="X12233")
FROM scope()
```


