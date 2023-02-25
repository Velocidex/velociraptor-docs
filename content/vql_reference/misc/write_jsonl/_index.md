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
filename|Output JSON files to open|string (required)
accessor|The accessor to use. Currently only supports "auto", "file" or "".|string
query|query to write into the file.|StoredQuery (required)

### Description

Write a query into a JSONL file.

