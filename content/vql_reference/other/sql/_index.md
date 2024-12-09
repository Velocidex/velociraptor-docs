---
title: sql
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## sql
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
driver|sqlite, mysql,or postgres|string (required)
connstring|SQL Connection String|string
file|Required if using sqlite driver|OSPath
accessor|The accessor to use if using sqlite|string
query||string (required)
args||Any

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Run queries against sqlite, mysql, and postgres databases

