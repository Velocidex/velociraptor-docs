---
title: min
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## min
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||LazyExpr (required)

### Description

Finds the smallest item in the aggregate.

It is only meaningful in a group by query.

### Example

The following query lists all the processes and shows the smallest
bash pid of all bash processes.

```vql
SELECT Name, min(items=Pid) as SmallestPid from pslist() Where Name =~ 'bash' group by Name
```


