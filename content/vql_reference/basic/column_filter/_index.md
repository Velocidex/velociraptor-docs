---
title: column_filter
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## column_filter
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|This query will be run to produce the columns.|StoredQuery (required)
exclude|One of more regular expressions that will exclude columns.|list of string
include|One of more regular expressions that will include columns.|list of string

### Description

Select columns from another query using regex.

Sometimes a query produces a large number of columns or
unpredictable column names (eg. the `read_reg_key()` plugin
produces a column per value name).

You can use the column_filter() plugin to select a subset of the
columns to include or exclude from an underlying query. For example:

```vql
SELECT * FROM column_filter(
query={
   SELECT 1 AS A, 2 AS B, 3 AS AB, 4 AS AA
   FROM scope()
}, include="A", exclude="B")
```

will include columns with the letter A in their name and remove
columns with the letter B (so it will have A and AA above).


