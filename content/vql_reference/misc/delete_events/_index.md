---
title: delete_events
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## delete_events
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|Name of artifact events to remove|string (required)
client_id|Client ID of events to remove (use 'server' for server events)|string (required)
start_time|Start time to be deleted|time.Time
end_time|End time to be deleted|time.Time
really_do_it|If not specified, just show what files will be removed|bool

Required Permissions: 
<i class="linkcolour label pull-right label-success">DELETE_RESULTS</i>

### Description

Delete all the files that make up a flow.

