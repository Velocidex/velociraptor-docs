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
filename|A list of log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Watch a syslog file and stream events from it. 

