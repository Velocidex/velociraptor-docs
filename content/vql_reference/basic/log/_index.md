---
title: log
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## log
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
message|Message to log.|string (required)
dedup|Suppress same message in this many seconds (default 60 sec).|int64
args|An array of elements to apply into the format string.|Any
level|Level to log at (DEFAULT, WARN, ERROR, INFO).|string

### Description

Log the message.

