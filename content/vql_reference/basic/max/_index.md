---
title: max
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## max
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||LazyExpr (required)

### Description

Finds the largest item in the aggregate.

It is only meaningful in a group by query.

### Example

The following query lists all the processes and shows the largest
bash pid of all bash processes.

```vql
SELECT Name, max(items=Pid) as LargestPid from pslist() Where Name =~ 'bash' group by Name
```


