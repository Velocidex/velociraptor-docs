---
title: scope
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  The scope plugin returns the current scope as a single row.

  The main use for this plugin is as a NOOP plugin in those cases we
  don't want to actually run anything.

  ### Example

  ```vql
  SELECT 1+1 As Two FROM scope()
  ```

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

### Description

return the scope.



{{< badge >}}Plugin{{< /badge >}}

### Description

The scope plugin returns the current scope as a single row.

The main use for this plugin is as a NOOP plugin in those cases we
don't want to actually run anything.

### Example

```vql
SELECT 1+1 As Two FROM scope()
```


