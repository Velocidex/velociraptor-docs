---
title: hunt_update
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## hunt_update
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id|The hunt to update|string (required)
stop|Stop the hunt|bool
start|Start the hunt|bool
description|Update hunt description|string
expires|Update hunt expiry|time.Time
add_labels|Labels to be added to hunt|list of string
del_labels|Labels to be removed from hunt|list of string

Required Permissions: 
<span class="linkcolour label label-success">START_HUNT</span>

### Description

Update a hunt.

