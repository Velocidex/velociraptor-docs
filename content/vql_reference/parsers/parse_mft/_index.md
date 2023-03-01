---
title: parse_mft
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_mft
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|The MFT file.|OSPath (required)
accessor|The accessor to use.|string
prefix|If specified we prefix all paths with this path.|OSPath
start|The first entry to scan.|int64

### Description

Scan the $MFT from an NTFS volume.

This plugin expect an $MFT file to operate on. For example, it is
commonly used with the 'ntfs' accessor which opens the local raw
device to provide access to the $MFT

```vql
SELECT * FROM parse_mft(filename="C:/$MFT", accessor="ntfs")
```

For parsing from an image file, you can extract the $MFT file
using the raw_ntfs accessor (which operates on images).

```vql
SELECT * FROM parse_mft(
     filename=pathspec(
       Path="$MFT",
       DelegateAccessor="file",
       DelegatePath='ntfs_image.dd'),
     accessor="raw_ntfs")
```


