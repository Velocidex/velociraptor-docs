---
title: monitoring
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## monitoring
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string
flow_id|A flow ID (client or server artifacts)|string
hunt_id|Retrieve sources from this hunt (combines all results from all clients)|string
artifact|The name of the artifact collection to fetch|string
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|Any
end_time|Stop end events reach this time (event sources).|Any
notebook_id|The notebook to read from (should also include cell id)|string
notebook_cell_id|The notebook cell read from (should also include notebook id)|string
notebook_cell_table|A notebook cell can have multiple tables.)|int64
start_row|Start reading the result set from this row|int64
count|Maximum number of clients to fetch (default unlimited)'|int64

Required Permissions: 
<i class="linkcolour label pull-right label-success">READ_RESULTS</i>

### Description

Extract monitoring log from a client. If client_id is not specified we watch the global journal which contains event logs from all clients.

