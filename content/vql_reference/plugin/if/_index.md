---
title: if
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## if
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
condition||Any (required)
then||StoredQuery (required)
else||StoredQuery

### Description

Conditional execution of query

This function evaluates a condition. Note that the values used in the
`then` or `else` clause are evaluated lazily. They may be expressions
that involve stored queries (i.e. queries stored using the `LET`
keyword). These queries will not be evaluated if they are not needed.

This allows a query to cheaply branch. For example, if a parameter is
given, then perform hash or upload to the server. See the
`Windows.Search.FileFinder` for an example of how `if()` is used.


