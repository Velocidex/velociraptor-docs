---
title: hunt_results
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## hunt_results
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact to retrieve|string
source|An optional source within the artifact.|string
hunt_id|The hunt id to read.|string (required)
brief|If set we return less columns (deprecated).|bool
orgs|If set we combine results from all orgs.|list of string

Required Permissions: 
<i class="linkcolour label pull-right label-success">READ_RESULTS</i>

### Description

Retrieve the results of a hunt.

This plugin essentially iterates over all flows in the hunt and
reads out all collected rows for each client in the same table.

It is equivalent to the source() plugin in the hunt notebook
context.


