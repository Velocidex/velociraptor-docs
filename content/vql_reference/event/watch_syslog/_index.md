---
title: watch_syslog
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_syslog
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Watch a syslog file and stream events from it. 

