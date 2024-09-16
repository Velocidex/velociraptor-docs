---
title: raw_ext4
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## raw_ext4
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access the Ext4 filesystem inside an image by parsing the image.

This accessor is designed to operate on images directly. It requires a
delegate accessor to get the raw image and will open files using the
FAT full path rooted at the top of the filesystem.

## Example

The following query will glob all the files under the directory 'a'
inside a Ext4 image file

```vql
SELECT *
FROM glob(globs='/**',
  accessor="raw_ext4",
  root=pathspec(
    Path="a",
    DelegateAccessor="file",
    DelegatePath='ext4.dd'))
```



