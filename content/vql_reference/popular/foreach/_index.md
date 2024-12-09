---
title: foreach
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## foreach
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
row|A query or slice which generates rows.|LazyExpr (required)
query|Run this query for each row.|StoredQuery
async|If set we run all queries asynchronously (implies workers=1000).|bool
workers|Total number of asynchronous workers.|int64
column|If set we only extract the column from row.|string

### Description

Executes 'query' once for each row in the 'row' query.

The columns in row will be stored in the scope that is used to
evaluate the query therefore the query may refer to the results
from the `row` query.

Foreach in VQL is essentially the same as an SQL JOIN operator but
much simpler to use.

If the `workers` parameter is specified, the plugin will spawn
this many workers and evaluate the `query` query in each worker
concurrently if possible. It is safe to use a large number here
(say 100) to utilize all available cores.


