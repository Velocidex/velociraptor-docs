---
title: source
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## source
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



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
notebook_cell_version|The notebook cell version to read from (should also include notebook id and notebook cell)|string
notebook_cell_table|A notebook cell can have multiple tables.)|int64
start_row|Start reading the result set from this row|int64
count|Maximum number of clients to fetch (default unlimited)'|int64
orgs|Run the query over these orgs. If empty use the current org.'|list of string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>

### Description

Retrieve rows from an artifact's source.

This plugin is mostly useful in reports. It attempts to do the
right thing automatically by inferring most parameters from its
execution environment.

For example when called within a CLIENT report context, it will
automatically fill its flow id, client id etc. Typically this
means that you only need to specify the source name (for
multi-source artifacts).


