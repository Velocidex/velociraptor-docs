---
title: generate
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## generate
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name to call the generator|string
query|Run this query to generator rows.|StoredQuery
delay|Wait before starting the query|int64
with_file_buffer|Enable file buffering|bool

### Description

Create a named generator that receives rows from the query.

This plugin allow multiple queries to efficiently filter rows from
the same query. For example:

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


