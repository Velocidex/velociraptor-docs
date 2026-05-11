---
title: get_client_monitoring
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Retrieve the current client monitoring state.

  The client monitoring table represents the server's configuration
  of client event queries to deploy.

  This function is designed to allow programmatic manipulation of
  the event query table in conjunction with the
  `set_client_monitoring()` function.

  It is commonly used together with the `patch()` function to patch
  the data structure to add additional event queries.

---



<div class="vql_item"></div>


## get_client_monitoring
<span class='vql_type label label-warning pull-right page-header'>Function</span>


<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>

### Description

Retrieve the current client monitoring state.

The client monitoring table represents the server's configuration
of client event queries to deploy.

This function is designed to allow programmatic manipulation of
the event query table in conjunction with the
`set_client_monitoring()` function.

It is commonly used together with the `patch()` function to patch
the data structure to add additional event queries.


