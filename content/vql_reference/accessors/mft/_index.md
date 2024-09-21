---
title: mft
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## mft
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

The `mft` accessor is used to access arbitrary MFT streams as
files.

The filename is taken as an MFT inode number in the form
`<entry_id>-<stream_type>-<id>`, e.g. `203-128-0`. The first
component of the file is the device number to open (e.g. `C:`)

This accessor does not support directories and so can not be used
in `glob()`

### Example

```vql
SELECT upload(accessor="mft", filename="C:/203-128-0")
FROM scope()
```


