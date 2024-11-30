---
title: generate
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## generate
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name to call the generator|string
query|Run this query to generator rows.|StoredQuery
delay|Wait before starting the query|int64
with_file_buffer|Enable file buffering|bool
fan_out|Wait for this many listeners to connect before starting the query|int64

### Description

Create a named generator that receives rows from the query.

This plugin allow multiple queries to efficiently filter rows from
the same query.

### Example

```vql
LET SystemLog = generate(query={
   SELECT * FROM parse_evtx(filename='''C:\Windows\system32\winevt\logs\System.evtx''')
})

SELECT timestamp(epoch=System.TimeCreated.SystemTime) AS Timestamp,
   Type, EventData
FROM combine(
a={
  SELECT *, "Kernel Driver Install" AS Type
  FROM SystemLog
  WHERE System.EventID.Value = 7045 AND EventData.ServiceType =~ "kernel"
}, b={
  SELECT *, "Log File Cleared" AS Type,
            UserData.LogFileCleared AS EventData
  FROM SystemLog
  WHERE System.EventID.Value = 104
})
```

NOTE: The `generate()` function produces a stored query that can be
used as the target of any `SELECT ... FROM` statement. Therefore
it does not make sense to materialize the output of `generate()`
because it is equivalent to materializing the actual target query
itself.

In other words this:

```vql
LET X <= generate(query={ SELECT * FROM watch_etw(...) })
```

Will attempt to enumerate the target query into an array and is
equivalent to:

```vql
LET X <= SELECT * FROM watch_etw(...)
```

Neither of those queries will terminate as VQL waits for them to
produce all their rows before moving to the next statement but the
`watch_etw()` query will never terminate since it is an event
query.


