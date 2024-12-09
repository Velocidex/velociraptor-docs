---
title: path_split
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## path_split
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Path to split into components.|Any (required)
path_type|Type of path (e.g. 'windows')|string

### Description

Split a path into components. Note this is more complex than just split() because it takes into account path escaping.

