---
title: monitoring
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## monitoring
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string (required)
artifact|The name of the event artifact to read|string (required)
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|Any
end_time|Stop end events reach this time (event sources).|Any
start_row|Start reading the result set from this row|int64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>

### Description

Extract monitoring log from a client.


