---
title: cache
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## cache
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
func|A function to evaluate|LazyExpr (required)
name|The global name of this cache (needed when more than one)|string
key|Cache key to use.|string (required)
period|The latest age of the cache.|int64

### Description

Creates a cache object.

A Cache is a data structure which is used to speed up calculating
data by keeping it's value in memory. A cache is essentially a key
value store - when the key is accessed, the function will be
calculated producing a value. If the key is accessed again, the
value is returned from the cache without calculating it again.

For example consider the following:

```vql
    LET get_pid_query(Lpid) =
       SELECT Pid, Ppid, Name FROM pslist(pid=Lpid)

    SELECT cache(func=get_pid_query(Lpid=Pid), key=str(str=Pid))
    FROM ....
```

The cache will ensure that get_pid_query() is only called once per
unique Pid by comparing the key against the internal memory store.


