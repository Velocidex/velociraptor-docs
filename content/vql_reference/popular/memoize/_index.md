---
title: memoize
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Memoize a query into memory.

  Memoizing a query means to cache the results of the query so they
  can be accessed quickly.

  Consider the following query:

  ```vql
  LET ProcessDetails(ProcessPid) = SELECT Name, Pid, Ppid FROM pslist()
    WHERE Pid=ProcessPid
  ```

  This query retrieves the process details for any Pid such as the
  Name, Pid and parent Pid.

  While this query works, imagine having to use it in a large query
  to resolve many different processes. Each time the function is
  called the pslist() plugin is run over all processes and the
  correct process is selected - this can lead to thousands of
  pslist() executions!

  We can solve this by memoizing the results of the query -
  i.e. storing them in memory and retrieving a single row based on a
  key.

  ```vql
  LET m <= memoize(query={
     SELECT Pid AS Key, Name, Pid, Ppid FROM pslist()
  }, key='Key')
  ```

  The `memoize()` function looks like a `dict()` and when accessed
  will automatically run the query once and cache its rows. The Key
  column of the query is used as the key of the dict.

  You can access the cache using the `get()` function or the `.`
  operator. If the key matches the entire row is retrieved:

  ```vql
  SELECT get(item=m, field=Pid).Name AS ProcessName
  FROM source()
  ```

  The `period` parameter is the number of seconds before the query
  is considered stale. When the data is stale, the query will be
  re-run to get fresh data.

  Providing the `filename` parameter allows the data to be stored to a
  file. This is helpful when the query is very large or the results
  need to be re-used in another query.

---



<div class="vql_item"></div>


## memoize
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Query to expand into memory|StoredQuery (required)
key|The name of the column to use as a key.|string (required)
period|The latest age of the cache.|int64
name|The name of this cache.|string
filename|Filename for a persistent cache.|string

### Description

Memoize a query into memory.

Memoizing a query means to cache the results of the query so they
can be accessed quickly.

Consider the following query:

```vql
LET ProcessDetails(ProcessPid) = SELECT Name, Pid, Ppid FROM pslist()
  WHERE Pid=ProcessPid
```

This query retrieves the process details for any Pid such as the
Name, Pid and parent Pid.

While this query works, imagine having to use it in a large query
to resolve many different processes. Each time the function is
called the pslist() plugin is run over all processes and the
correct process is selected - this can lead to thousands of
pslist() executions!

We can solve this by memoizing the results of the query -
i.e. storing them in memory and retrieving a single row based on a
key.

```vql
LET m <= memoize(query={
   SELECT Pid AS Key, Name, Pid, Ppid FROM pslist()
}, key='Key')
```

The `memoize()` function looks like a `dict()` and when accessed
will automatically run the query once and cache its rows. The Key
column of the query is used as the key of the dict.

You can access the cache using the `get()` function or the `.`
operator. If the key matches the entire row is retrieved:

```vql
SELECT get(item=m, field=Pid).Name AS ProcessName
FROM source()
```

The `period` parameter is the number of seconds before the query
is considered stale. When the data is stale, the query will be
re-run to get fresh data.

Providing the `filename` parameter allows the data to be stored to a
file. This is helpful when the query is very large or the results
need to be re-used in another query.


