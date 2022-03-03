---
title: watch_syslog
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_syslog
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of string (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int

### Description

Watch a syslog file and stream events from it. 

