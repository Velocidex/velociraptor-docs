---
title: reg_set_value
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## reg_set_value
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Registry value path.|string (required)
value|Value to set|LazyExpr (required)
type|Type to set (SZ, DWORD, QWORD)|string (required)
create|Set to create missing intermediate keys|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_WRITE</span>

### Description

Set a value in the registry.

