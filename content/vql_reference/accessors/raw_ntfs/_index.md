---
title: raw_ntfs
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## raw_ntfs
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Access the NTFS filesystem inside an image by parsing NTFS.

This accessor is designed to operate on images directly. It requires a
delegate accessor to get the raw image and will open files using the
NTFS full path rooted at the top of the filesystem.

### Example

The following query will open the $MFT file from the raw image file
that will be accessed using the file accessor.

```vql
SELECT * FROM parse_mft(
  filename=pathspec(
    Path="$MFT",
    DelegateAccessor="file",
    DelegatePath='ntfs.dd'),
  accessor="raw_ntfs")
```

Note that this accessor is different than the standard `ntfs`
accessor which attempts to emulate the simpler `file`
accessor. This is so the paths can be easily interchanged between
`file` and `ntfs`.

The `ntfs` accessor automatically calculates the raw device needed
to open the ntfs partition. The following queries are equivalent:

```
SELECT * FROM parse_mft(
  filename=pathspec(
    Path="$MFT",
    DelegateAccessor="raw_file",
    DelegatePath='''\\.\C:'''),
  accessor="raw_ntfs")

SELECT * FROM parse_mft(
  filename='''\\.\C:\$MFT''',
  accessor="ntfs")
```

The `raw_ntfs` accessor is available in all supported platforms
(i.e. not only Windows) and uses the same filesystem parser as the
`ntfs` accessor. You can use this in conjunction with the
`remap()` function to analyse raw NTFS volumes on any supported
platform.


