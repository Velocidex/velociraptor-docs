---
title: flow_results
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## flow_results
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact to retrieve|string
source|An optional source within the artifact.|string
flow_id|The hunt id to read.|string (required)
client_id|The client id to extract|string (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">READ_RESULTS</i>

### Description

Retrieve the results of a flow.

This is similar to the source() plugin.

NOTE: Since a collection can collect multiple artifacts you must
specify the artifact you are interested in.


