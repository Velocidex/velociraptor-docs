---
title: write_csv
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## write_csv
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|OSPath (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_WRITE</span>

### Description

Write a query into a CSV file.

