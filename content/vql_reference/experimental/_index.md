---
title: Experimental
weight: 60
linktitle: Experimental
index: true
---

Velociraptor is evolving quickly. We sometime implement
functionality which may not remain in Velociraptor. This page
documents some of the experimental features. If you find them
useful, please let us know!


<div class="vql_item"></div>


## js
<span class='vql_type pull-right'>Function</span>

Compile and run javascript code.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
js|The body of the javascript code.|string (required)
key|If set use this key to cache the JS VM.|string



<div class="vql_item"></div>


## js_call
<span class='vql_type pull-right'>Function</span>

Compile and run javascript code.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
func|JS function to call.|string (required)
args|Positional args for the function.|Any
key|If set use this key to cache the JS VM.|string



<div class="vql_item"></div>


## sequence
<span class='vql_type pull-right'>Plugin</span>

Combines the output of many queries into an in memory fifo. After
each row is received from any subquery runs the query specified in
the 'query' parameter to retrieve rows from the memory SEQUENCE
object.

The `sequence()` plugin is very useful to correlate temporally close
events from multiple queries - for example, say a process execution
query and a network query. The `query` can then search for relevant
network event closely followed by a process event.

For example:
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




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Run this query to generate rows. The query should select from SEQUENCE which will contain the current set of rows in the sequence. The query will be run on each new row that is pushed to the sequence.|StoredQuery (required)
max_age|Maximum number of seconds to hold rows in the sequence.|int64

