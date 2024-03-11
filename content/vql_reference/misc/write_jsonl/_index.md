---
title: write_jsonl
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## write_jsonl
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|OSPath (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)
buffer_size|Maximum size of buffer before flushing to file.|int

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_WRITE</i>

### Description

Write a query into a JSONL file.

