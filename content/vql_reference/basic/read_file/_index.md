---
title: read_file
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## read_file
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
length|Max length of the file to read.|int
offset|Where to read from the file.|int64
filename|One or more files to open.|OSPath (required)
accessor|An accessor to use.|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Read a file into a string.

