---
title: offset
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## offset
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Allow reading another file from a specific offset.

The filename is taken as an offset into the delegate.

### Example

```vql
SELECT read_file(accessor="offset", filename=pathspec(
DelegateAccessor="data",
DelegatePath="Hello world",
Path="/6"))
FROM scope()

-> "world"
```

This accessor is useful in cases where we need to rebase the zero
offset into the file. For example when reading a filesystem
partition from an image.


