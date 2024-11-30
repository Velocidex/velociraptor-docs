---
title: chain
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## chain
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
async|If specified we run all queries asynchronously and combine the output.|bool

### Description

Chain the output of several queries into the same table.

This plugin takes a number of queries and joins their output into
the same table.

You can provide the `async=TRUE` parameter to run the queries in
parallel. This is needed when queries are event queries that never
terminate. You can use this property to collect the output from
multiple event plugins into the same artifact output.

### Example

The following returns the rows from the first query then the rows from
the second query.

```vql
SELECT * FROM chain(
  a={ SELECT ...},
  b={ SELECT ...},
  async=TRUE)
```


