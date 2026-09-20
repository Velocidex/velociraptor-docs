---
title: raw_reg
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Access keys and values by parsing a raw registry hive.

  Path is a OSPath having delegate opening the raw registry hive.

  For example we can search the raw registry for the System hive:

  ```vql
  SELECT OSPath
  FROM glob(globs='*',
      accessor="raw_reg",
      root=pathspec(
        Path="ControlSet001",
        DelegateAccessor="auto",
        DelegatePath="C:/Windows/System32/config/System"))
  ```

  This accessor is available on all supported platforms and uses the
  internal raw registry parser.

build:
  list: never
---



{{< badge >}}Accessor{{< /badge >}}

### Description

Access keys and values by parsing a raw registry hive.

Path is a OSPath having delegate opening the raw registry hive.

For example we can search the raw registry for the System hive:

```vql
SELECT OSPath
FROM glob(globs='*',
    accessor="raw_reg",
    root=pathspec(
      Path="ControlSet001",
      DelegateAccessor="auto",
      DelegatePath="C:/Windows/System32/config/System"))
```

This accessor is available on all supported platforms and uses the
internal raw registry parser.


