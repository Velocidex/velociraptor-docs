---
title: sequence
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## sequence
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Run this query to generate rows. The query should select from SEQUENCE which will contain the current set of rows in the sequence. The query will be run on each new row that is pushed to the sequence.|StoredQuery (required)
max_age|Maximum number of seconds to hold rows in the sequence.|int64

### Description

Combines the output of many queries into an in memory fifo. After
each row is received from any subquery runs the query specified in
the 'query' parameter to retrieve rows from the memory SEQUENCE
object.

The `sequence()` plugin is very useful to correlate temporally close
events from multiple queries - for example, say a process execution
query and a network query. The `query` can then search for relevant
network event closely followed by a process event.

### Example

```vql
SELECT * FROM sequence(
network={
  SELECT * FROM Artifact.Windows.ETW.DNS()
  WHERE Query =~ "github"
},
process={
  SELECT * FROM Artifact.Windows.Detection.WMIProcessCreation()
  WHERE Name =~ "cmd.exe"
},
query={
  SELECT Name, CommandLine, {  -- search for a DNS lookup
    SELECT * FROM SEQUENCE
    WHERE Query =~ "github"
  } AS DNSInfo
  FROM SEQUENCE
  WHERE DNSInfo AND Name
})
```


