---
title: timeline
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## timeline
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
timeline|Name of the timeline to read|string (required)
components|List of child components to include|list of string
skip|List of child components to skip|list of string
start|First timestamp to fetch|Any
notebook_id|The notebook ID the timeline is stored in.|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">READ_RESULTS</i>

### Description

Read a timeline. You can create a timeline with the timeline_add() function

