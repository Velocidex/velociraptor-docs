---
title: compress
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## compress
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|A path to compress|string (required)
output|A path to write the output - default is the path with a .gz extension|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_WRITE</i>
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Compress a file.

The file is compressed using gzip. You can change the location of
the output using the output parameter.


