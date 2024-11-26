---
title: parse_pe
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_pe
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The PE file to open.|OSPath (required)
accessor|The accessor to use.|string
base_offset|The offset in the file for the base address.|int64

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_READ</span>

### Description

Parse a PE file.

