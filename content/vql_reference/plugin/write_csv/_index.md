---
title: write_csv
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## write_csv
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|string (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_WRITE</i>

### Description

Write a query into a CSV file.

