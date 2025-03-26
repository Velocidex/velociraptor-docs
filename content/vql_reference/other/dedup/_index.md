---
title: dedup
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## dedup
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
key|A column name to use as dedup key.|string (required)
query|Run this query to generate items.|StoredQuery (required)
timeout|LRU expires in this much time (default 60 sec).|uint64
size|Size of the LRU cache.|int64

### Description

Dedups the query based on a column. This will suppress rows with identical values for the key column

