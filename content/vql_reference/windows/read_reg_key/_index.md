---
title: read_reg_key
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## read_reg_key
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
globs|Glob expressions to apply.|list of string
accessor|The accessor to use.|string
root|The root directory to glob from (default '/').|OSPath

### Description

This is a convenience plugin which applies the globs to the registry
accessor to find keys. For each key the plugin then lists all the
values within it, and returns a row which has the value names as
columns, while the cells contain the value's stat info (and data
content available in the `Data` field).

This makes it easier to access a bunch of related values at once.


