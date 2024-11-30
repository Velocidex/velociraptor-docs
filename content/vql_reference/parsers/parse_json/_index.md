---
title: parse_json
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_json
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|Json encoded string.|string (required)

### Description

Parse a JSON string into an object.

Note that when VQL dereferences fields in a dict it returns a Null for
those fields that do not exist. Thus there is no error in actually
accessing missing fields, the column will just return nil.


