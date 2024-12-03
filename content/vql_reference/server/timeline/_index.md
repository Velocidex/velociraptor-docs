---
title: timeline
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## timeline
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
timeline|Name of the timeline to read|string (required)
components|List of child components to include|list of string
skip|List of child components to skip|list of string
start|First timestamp to fetch|Any
notebook_id|The notebook ID the timeline is stored in.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>

### Description

Read a timeline. You can create a timeline with the timeline_add() function

