---
title: fat
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## fat
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Access the FAT filesystem inside an image by parsing FAT.

This accessor is designed to operate on images directly. It requires a
delegate accessor to get the raw image and will open files using the
FAT full path rooted at the top of the filesystem.

### Example

The following query will glob all the files under the directory 'a'
inside a FAT image file

```vql
SELECT *
FROM glob(globs='/**',
  accessor="fat",
  root=pathspec(
    Path="a",
    DelegateAccessor="file",
    DelegatePath='fat.dd'))
```


