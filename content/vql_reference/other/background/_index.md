---
title: background
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## background
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Run this query in the background.|StoredQuery

### Description

Run a query in the background.

All output from the query is discarded. The query will not wait
for the background thread to exit - instead the background query
will be cancelled when this query exists.


