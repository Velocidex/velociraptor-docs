---
title: cache
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Creates a cache object.

  A Cache is a data structure which is used to speed up calculating
  data by keeping its value in memory. A cache is essentially a key
  value store - when the key is accessed, the function will be
  calculated producing a value. If the key is accessed again, the
  value is returned from the cache without calculating it again.

  For example consider the following:

  ```vql
  LET get_pid_query(Lpid) =
    SELECT Pid, Ppid, Name FROM pslist(pid=Lpid)

  LET _ <= cache(lambda='x=>get_pid_query(Lpid=x)[0]')

  SELECT cache(key=getpid())
  FROM scope()
  ```

  The cache will ensure that `get_pid_query()` is only called once per
  unique Pid by comparing the key against the internal memory store.

---



<div class="vql_item"></div>


## cache
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
func|A function to evaluate (deprecated - use a lambda instead)|LazyExpr
lambda|A VQL lambda to evaluate with the key as parameter. eg. x=>x+1 |Lambda
name|The global name of this cache (needed when more than one)|string
key|Cache key to use.|Any
period|The latest age of the cache.|int64
filename|Filename for a persistent cache.|string
max_size|Maximum size of the LRU (default 10000).|uint64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_WRITE</span>

### Description

Creates a cache object.

A Cache is a data structure which is used to speed up calculating
data by keeping its value in memory. A cache is essentially a key
value store - when the key is accessed, the function will be
calculated producing a value. If the key is accessed again, the
value is returned from the cache without calculating it again.

For example consider the following:

```vql
LET get_pid_query(Lpid) =
  SELECT Pid, Ppid, Name FROM pslist(pid=Lpid)

LET _ <= cache(lambda='x=>get_pid_query(Lpid=x)[0]')

SELECT cache(key=getpid())
FROM scope()
```

The cache will ensure that `get_pid_query()` is only called once per
unique Pid by comparing the key against the internal memory store.


