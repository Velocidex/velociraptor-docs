---
title: delay
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## delay
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for rows.|StoredQuery (required)
delay|Number of seconds to delay.|int64 (required)
buffer_size|Maximum number of rows to buffer (default 1000).|int64

### Description

Executes 'query' and delays relaying the rows by the specified number of seconds.

