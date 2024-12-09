---
title: carve_usn
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## carve_usn
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
device|The device file to open.|OSPath
image_filename|A raw image to open. You can also provide the accessor if using a raw image file.|OSPath
accessor|The accessor to use.|string
mft_filename|A path to a raw $MFT file to use for path resolution.|OSPath
usn_filename|A path to a raw USN file to carve. If not provided we carve the image file or the device.|OSPath

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Carve for the USN journal entries from a device.

In practice the USN journal is set to roll over fairly quickly
(default size is usually 32Mb). On busy systems this will lead to
loss of valuable information.

This plugin carves the raw device for USN entries. Usual caveats
apply for all carved data, however this will often recover entries
from a long time before the roll over.

This plugin can take a long time!

### Example

```vql
SELECT * FROM carve_usn(device='''\\.\C:''')
```


