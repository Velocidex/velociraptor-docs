---
title: parse_ntfs
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_ntfs
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
device|The device file to open. This may be a full path for example C:\Windows - we will figure out the device automatically.|string
filename|A raw image to open. You can also provide the accessor if using a raw image file.|OSPath
accessor|The accessor to use.|string
inode|The MFT entry to parse in inode notation (5-144-1).|string
mft|The MFT entry to parse.|int64
mft_offset|The offset to the MFT entry to parse.|int64

### Description

Parse specific inodes from an NTFS image file or the raw device.

This function retrieves more information about a specific MFT
entry including listing all its attributes.

It can either operate on an image file or the raw device (on
windows).

### Example:

```vql
SELECT parse_ntfs(
    filename='ntfs_image.dd',
    inode="46-128-0")
FROM scope()
```

You can get the MFT entry number from `parse_mft()` or from the
Data attribute of a `glob()` using the `ntfs` accessor.


