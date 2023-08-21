---
title: client_info
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## client_info
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">READ_RESULTS</i>

### Description

Returns client info (like the fqdn) from the datastore.

Velociraptor maintains basic information about the client in the
data store, such as its hostname, OS etc.

This information is refreshed each time the `Generic.Client.Info`
artifact is collected from the endpoint so it can be out of
date. This process is called "interrogation" of the endpoint.

You can refresh the entire fleet's datastore by scheduling a
`Generic.Client.Info` hunt.


