---
title: cancel_flow
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## cancel_flow
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_SERVER</i>
<i class="linkcolour label pull-right label-success">COLLECT_CLIENT</i>

### Description

Cancels the flow.

This sends the client an immediate cancellation message and stops
the flow. It also removes any outstanding requests for the client
if there are any.


