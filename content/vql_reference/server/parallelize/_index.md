---
title: parallelize
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parallelize
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|The query will be run in parallel over batches.|StoredQuery (required)
client_id|The client id to extract|string
flow_id|A flow ID (client or server artifacts)|string
hunt_id|Retrieve sources from this hunt (combines all results from all clients)|string
artifact|The name of the artifact collection to fetch|string
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|int64
end_time|Stop end events reach this time (event sources).|int64
notebook_id|The notebook to read from (should also include cell id)|string
notebook_cell_id|The notebook cell read from (should also include notebook id)|string
notebook_cell_table|A notebook cell can have multiple tables.)|int64
workers|Number of workers to spawn.)|int64
batch|Number of rows in each batch.)|int64

Required Permissions: 
<span class="linkcolour label label-success">READ_RESULTS</span>

### Description

Runs query on result batches in parallel.

Normally the source() plugin reads result sets from disk in
series. This is fine when the result set is not too large but when
we need to filter a lot of rows at the same time it is better to
use all cores by reading and filtering in parallel.

The `parallelize()` plugin is a parallel version of `source()`
which breaks result sets into batches and applies a query over
each batch in parallel. If you have a multi threaded machine, it
will be a lot faster.

The query passed to parallelize() will receive a special scope in
which the `source()` plugin will returns results from a small
batch of the total. The size of this batch is controlled by the
`batch` parameter.

This is especially useful when we need to filter rows from a hunt
- each client's result set will be filtered in parallel on a
different core.

### Example

```vql
SELECT * FROM parallelize(hunt_id=HuntId, artifact=ArtifactName, query={
   SELECT * FROM source()
   WHERE FullPath =~ "XYZ"
})
```


