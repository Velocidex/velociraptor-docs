---
title: batch
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## batch
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
batch_size|Size of batch (defaults to 10).|int64
batch_func|A VQL Lambda that determines when a batch is ready. Example 'x=>len(list=x) >= 10'.|string
query|Run this query over the item.|StoredQuery (required)
timeout|If specified we flush incomplete batches in this many seconds.|uint64

### Description

Batches query rows into multiple arrays.

This is useful for batching multiple rows from a query into
another query, such as sending results to an API endpoint.

### Example

```vql
SELECT * FROM batch(query={
  SELECT _value
  FROM range(start=0, end=10, step=1)
}, batch_size=3)
```


