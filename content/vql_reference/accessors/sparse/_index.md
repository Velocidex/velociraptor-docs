---
title: sparse
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## sparse
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Allows reading another file by overlaying a sparse map on top of
it.

The map excludes reading from certain areas which are considered
sparse.

The resulting file is sparse (and therefore uploading it excludes
the masked out regions). The filename is taken as a list of
ranges.

For example here we create a sparse file over the delegate which only
defines the first 5 bytes, then a 5 byte sparse region then another 5
bytes.

```vql
SELECT upload(accessor="sparse", path=pathspec(
  DelegateAccessor="data", DelegatePath=MyData,
  Path=[dict(Offset=0,Length=5), dict(Offset=10,Length=5)])
FROM scope()
```

The uploaded file will contain only 10 bytes but will retain the 5
byte "hole" in the middle.

This accessor is most useful when uploading or masking parts of other
files - for example uploading a carved files from a larger image. Note
that delegate offsets are retained in this accessor (so for example
offset 10 in this accessor corresponds to offset 10 in the delegate
regardless of the sparse map).

For more flexibility than this use the "ranged" accessor.


