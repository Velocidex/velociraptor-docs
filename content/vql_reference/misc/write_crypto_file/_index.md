---
title: write_crypto_file
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## write_crypto_file
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|Path to the file to write|OSPath (required)
query|query to write into the file.|StoredQuery (required)
max_wait|How often to flush the file (default 60 sec).|uint64
max_rows|How many rows to buffer before writing (default 1000).|uint64
max_size|When the file grows to this size, truncate it (default 1Gb).|uint64

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_WRITE</span>

### Description

Write a query into an encrypted local storage file.

