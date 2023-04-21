---
title: send_event
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## send_event
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact name to send the event to.|string (required)
row|The row to send to the artifact|ordereddict.Dict (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">SERVER_ADMIN</i>
<i class="linkcolour label pull-right label-success">PUBLISH</i>

### Description

Sends an event to a server event monitoring queue.

This is used to send an event to a waiting server event monitoring
artifact (either as a VQL query running on the server or perhaps
an external program waiting for this event via the API.


