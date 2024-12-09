---
title: delete_events
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## delete_events
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|Name of artifact events to remove|string (required)
client_id|Client ID of events to remove (use 'server' for server events)|string (required)
start_time|Start time to be deleted|time.Time
end_time|End time to be deleted|time.Time
really_do_it|If not specified, just show what files will be removed|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">DELETE_RESULTS</span>

### Description

Delete events from a flow.

