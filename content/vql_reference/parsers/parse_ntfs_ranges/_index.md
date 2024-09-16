---
title: parse_ntfs_ranges
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_ntfs_ranges
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
device|The device file to open. This may be a full path for example C:\Windows - we will figure out the device automatically.|string
filename|A raw image to open. You can also provide the accessor if using a raw image file.|OSPath
mft_filename|A path to a raw $MFT file to parse.|OSPath
accessor|The accessor to use.|string
inode|The MFT entry to parse in inode notation (5-144-1).|string
mft|The MFT entry to parse.|int64
mft_offset|The offset to the MFT entry to parse.|int64

### Description

Show the run ranges for an NTFS stream.

Note: You can also use a raw $MFT file to operate on - see
`parse_ntfs()` for a full description.


