---
title: parse_lines
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_lines
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Parse a file separated into lines.

