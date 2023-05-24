---
title: get_client_monitoring
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## get_client_monitoring
<span class='vql_type pull-right page-header'>Function</span>


Required Permissions: 
<i class="linkcolour label pull-right label-success">READ_RESULTS</i>

### Description

Retrieve the current client monitoring state.

The client monitoring table represent's the server configuration
of client event queries to deploy.

This function is designed to allow programmatic manipulation of
the event query table in conjunction with set_client_monitoring()
function.

It is commonly used together with the `patch()` function to patch
the data structure to add additional event queries.


