---
title: parse_journald
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_journald
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of journal log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
raw|Emit raw events (not parsed).|bool
start_time|Only parse events newer than this time (default all times).|time.Time
end_time|Only parse events older than this time (default all times).|time.Time

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_READ</span>

### Description

Parse a journald file.

