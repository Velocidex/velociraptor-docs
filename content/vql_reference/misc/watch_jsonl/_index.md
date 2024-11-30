---
title: watch_jsonl
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_jsonl
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_READ</span>

### Description

Watch a jsonl file and stream events from it.

