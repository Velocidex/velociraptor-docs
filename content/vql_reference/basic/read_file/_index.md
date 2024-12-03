---
title: read_file
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## read_file
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
length|Max length of the file to read.|int
offset|Where to read from the file.|int64
filename|One or more files to open.|OSPath (required)
accessor|An accessor to use.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Read a file into a string.

