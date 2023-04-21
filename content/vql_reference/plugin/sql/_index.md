---
title: sql
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## sql
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
driver|sqlite, mysql,or postgres|string (required)
connstring|SQL Connection String|string
file|Required if using sqlite driver|string
accessor|The accessor to use if using sqlite|string
query||string (required)
args||Any

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Run queries against sqlite, mysql, and postgres databases

