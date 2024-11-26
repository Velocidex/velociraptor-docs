---
title: vmdk
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## vmdk
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Allow reading a VMDK file.

This accessor allows access to the content of VMDK files. Note
that usually VMDK files are disk images with a partition table and
an NTFS volume. You will usually need to wrap this accessor with a
suitable Offset (to account for the partition) and parse it with
the the "raw_ntfs" accessor.

The VMDK file should be the metadata file (i.e. not the extent
files).  The extent files are expected to be in the same directory
as the metadata file and this accessor will open them separately.

### Example

```vql
SELECT OSPath.Path AS OSPath, Size, Mode.String
FROM glob(
  globs="*", accessor="raw_ntfs", root=pathspec(
    Path="/",
    DelegateAccessor="offset",
    DelegatePath=pathspec(
      Path="/65536",
      DelegateAccessor="vmdk",
      DelegatePath="/tmp/test.vmdk")))
```



