---
title: watch_csv
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_csv
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|list of string (required)
accessor|The accessor to use|string
auto_headers|If unset the first row is headers|bool
separator|Comma separator (default ',')|string
comment|The single character that should be considered a comment|string
columns|The columns to use|list of string

### Description

Watch a CSV file and stream events from it. Note: This is an event
plugin which does not complete.

This plugin is the event version of `parse_csv()`. When the CSV file
grows this plugin will emit the new rows.


