---
title: all
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## all
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
items|The items to consider. Can be an array, subquery or stored query. Will only be lazily evaluted!|Any (required)
filter|A callback to consider each item|Lambda
regex|Optionally one or more regex can be provided for convenience|list of string

### Description

Returns TRUE if all items are true.

