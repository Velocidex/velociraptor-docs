---
title: split_records
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## split_records
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filenames|Files to parse.|list of OSPath (required)
accessor|The accessor to use|string
regex|The split regular expression (e.g. a comma, default whitespace)|string
columns|If the first row is not the headers, this arg must provide a list of column names for each value.|list of string
first_row_is_headers|A bool indicating if we should get column names from the first row.|bool
count|Only split into this many columns if possible.|int
record_regex|A regex to split data into records (default |string
buffer_size|Maximum size of line buffer (default 64kb).|int

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Parses files by splitting lines into records.

