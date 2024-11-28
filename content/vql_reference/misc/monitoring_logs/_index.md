---
title: monitoring_logs
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## monitoring_logs
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string (required)
artifact|The name of the artifact collection to fetch|string (required)
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|Any
end_time|Stop end events reach this time (event sources).|Any

Required Permissions: 
<span class="linkcolour label label-success">READ_RESULTS</span>

### Description

Retrieve log messages from client event monitoring for the specified client id and artifact

