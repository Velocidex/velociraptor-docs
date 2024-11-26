---
title: ewf
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## ewf
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Allow reading an EWF file.

Note that usually EWF files form a set of files with extensions
like .E01, .E02 etc. This accessor will automatically try to find
all parts of the same volume set if the file name ends with a '.E01'.

### Example

```vql
SELECT * FROM glob(
  globs="*", accessor="raw_ntfs", root=pathspec(
    Path="/",
    DelegateAccessor="ewf",
    DelegatePath="C:/test.ntfs.dd.E01"))
```

The next example reads a FAT partition through the offset
accessor (32256 is the byte offset of the first FAT partition).

```vql
SELECT OSPath.Path AS OSPath, Size, Mode.String
FROM glob(
       globs="*", accessor="fat", root=pathspec(
          Path="/",
          DelegateAccessor="offset",
          DelegatePath=pathspec(
            Path="/32256",
            DelegateAccessor="ewf",
            DelegatePath="/tmp/ubnist1.gen3.E01")))
```


