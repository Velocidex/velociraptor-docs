---
title: cat
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## cat
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|File to open.|OSPath (required)
accessor|An accessor to use.|string
chunk|length of each chunk to read from the file.|int
timeout|If specified we abort reading after this much time.|int

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Read files in chunks.

This is mostly useful for character devices on Linux or special files which can not be read in blocks.

