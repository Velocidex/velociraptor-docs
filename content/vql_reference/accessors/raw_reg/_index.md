---
title: raw_reg
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## raw_reg
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access keys and values by parsing a raw registry hive.

Path is a OSPath having delegate opening the raw registry hive.

For example we can search the raw registry for the System hive:

```sql
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


