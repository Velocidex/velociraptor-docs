---
title: write_file
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## write_file
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|The data to write|string (required)
dest|The destination file to write.|string (required)
permissions|Required permissions (e.g. 'x').|string
append|If true we append to the target file otherwise truncate it|bool
create_directories|If true we ensure the destination directories exist|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_WRITE</span>
<span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Writes a string onto a file.

This VQL function is a convenience wrapper to the copy() function.


