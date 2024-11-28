---
title: compress
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## compress
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|A path to compress|string (required)
output|A path to write the output - default is the path with a .gz extension|string

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_WRITE</span>
<span class="linkcolour label label-success">FILESYSTEM_READ</span>

### Description

Compress a file.

The file is compressed using gzip. You can change the location of
the output using the output parameter.


