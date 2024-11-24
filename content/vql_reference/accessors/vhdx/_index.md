---
title: vhdx
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## vhdx
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Allow reading a VHDX file.

This accessor allows access to the content of VHDX files. Note that usually
VHDX files are disk images with a partition table and an NTFS volume. You
will usually need to wrap this accessor with a suitable Offset (to account
for the partition) and parse it with the the "raw_ntfs" accessor.

### Example

```vql
SELECT OSPath.Path AS OSPath, Size, Mode.String
FROM glob(
   globs="*", accessor="raw_ntfs", root=pathspec(
     Path="/",
     DelegateAccessor="offset",
     DelegatePath=pathspec(
       Path="/65536",
       DelegateAccessor="vhdx",
       DelegatePath="/tmp/test.vhdx")))
```



