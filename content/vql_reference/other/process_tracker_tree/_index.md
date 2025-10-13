---
title: process_tracker_tree
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## process_tracker_tree
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
id|Process ID.|string
data_callback|A VQL Lambda function to that receives a ProcessEntry and returns the data node for each process.|Lambda
max_items|The maximum number of process entries to return (default 1000)|int64

### Description

Get the full process tree under the process id.

