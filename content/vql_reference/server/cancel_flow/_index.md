---
title: cancel_flow
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Cancels the flow.

  This sends the client an immediate cancellation message and stops
  the flow. It also removes any outstanding requests for the client
  if there are any.

---



<div class="vql_item"></div>


## cancel_flow
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string
full_request|If specified we include the full request in the output. This can be very large.|bool
downloads|If specified we include the flow exports in the output.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_SERVER</span>
<span class="permission_list linkcolour label label-important">COLLECT_CLIENT</span>

### Description

Cancels the flow.

This sends the client an immediate cancellation message and stops
the flow. It also removes any outstanding requests for the client
if there are any.


