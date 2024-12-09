---
title: sample
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## sample
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source query.|StoredQuery (required)
n|Pick every n row from query.|int64 (required)

### Description

Executes 'query' and samples every n'th row.

This is most useful on the server in order to downsample event
artifact results.


