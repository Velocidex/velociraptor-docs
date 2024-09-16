---
title: parse_usn
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_usn
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
device|The device file to open.|OSPath
image_filename|A raw image to open. You can also provide the accessor if using a raw image file.|OSPath
accessor|The accessor to use.|string
mft_filename|A path to a raw $MFT file to use for path resolution.|OSPath
usn_filename|A path to a raw USN file to parse. If not provided we extract it from the Device or Image file.|OSPath
start_offset|The starting offset of the first USN record to parse.|int64
fast_paths|If set we resolve full paths using faster but less accurate algorithm.|bool

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Parse the USN journal from a device, image file or USN file.

This plugin calculates the full path of a USN entry by tracing its
parent MFT entries through the MFT file. The MFT can be found in
the same device or image that the USN is read from, or provided
separately using a different file.

The plugin also considers information from the USN itself in
resolving the full path. This technique is described here
https://cybercx.com.au/blog/ntfs-usnjrnl-rewind/ in detail but it
can result in more accurate path resolution when the directories
have also been removed.


