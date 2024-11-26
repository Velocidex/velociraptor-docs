---
title: write_jsonl
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## write_jsonl
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|OSPath (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)
buffer_size|Maximum size of buffer before flushing to file.|int

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_WRITE</span>

### Description

Write a query into a JSONL file.

