---
title: xattr
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## xattr
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|Filename to inspect.|OSPath (required)
attribute|Attribute to collect. |list of string
accessor|File accessor|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Query a file for the specified extended attribute.

If no attributes are provided, this function will return all extended attributes
for the file.

Please note: this API is not reliable, so please provided extended attributes
where possible.

Note: This function only works on Mac and Linux.


