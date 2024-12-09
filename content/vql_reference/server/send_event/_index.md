---
title: send_event
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## send_event
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact name to send the event to.|string (required)
row|The row to send to the artifact|ordereddict.Dict (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>
<span class="permission_list linkcolour label label-important">PUBLISH</span>

### Description

Sends an event to a server event monitoring queue.

This is used to send an event to a waiting server event monitoring
artifact (either as a VQL query running on the server or perhaps
an external program waiting for this event via the API.


