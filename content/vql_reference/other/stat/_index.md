---
title: stat
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## stat
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|One or more files to open.|OSPath (required)
accessor|An accessor to use.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Get file information. Unlike glob() this does not support wildcards.
