---
title: dirname
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Return the directory path.

  ### Example

  ```vql
  dirname(path="/usr/bin/ls") -> "/usr/bin"
  ```

  ### See also

  - [basename]({{< ref "/vql_reference/popular/basename/" >}})

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|Any (required)
sep|Separator to use (default /)|string
path_type|Type of path (e.g. windows, linux)|string
### Description

Return the directory path.

### Example

```vql
dirname(path="/usr/bin/ls") -> "/usr/bin"
```

### See also

- [basename]({{< ref "/vql_reference/popular/basename/" >}})


