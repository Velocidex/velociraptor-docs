---
title: query
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## query
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|Any (required)
env|A dict of args to insert into the scope.|ordereddict.Dict
cpu_limit|Average CPU usage in percent of a core.|float64
iops_limit|Average IOPs to target.|float64
timeout|Cancel the query after this many seconds|float64
progress_timeout|If no progress is detected in this many seconds, we terminate the query and output debugging information|float64
org_id|If specified, the query will run in the specified org space (Use 'root' to refer to the root org)|string
runas|If specified, the query will run as the specified user|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">IMPERSONATION</i>

### Description

Evaluate a VQL query.

