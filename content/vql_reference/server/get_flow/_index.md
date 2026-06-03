---
title: get_flow
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Gets flow details.
---



<div class="vql_item"></div>


## get_flow
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string
summary|If specified we fetch just the basic summary of the flow. This is a bit faster.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_CLIENT</span>
<span class="permission_list linkcolour label label-important">COLLECT_SERVER</span>

### Description

Gets flow details.

