---
title: lru
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## lru
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
size|Size of the LRU (default 1000)|int64

### Description

Creates an LRU object

A LRU is like a dict, except that older items are expired. It is
useful to creating running lookup values without exceeding memory
constraints.

An example of this query is maintaining lookups between Kernel
objects and key names within the Windows Kernel Registry provider.

```vql
LET Cache <= lru()

SELECT *, EventData,
    get(item=Cache, field=EventData.KeyObject) AS KeyName
FROM watch_etw(guid="{70EB4F03-C1DE-4F73-A051-33D13D5413BD}")
WHERE if(
   condition=System.ID = 2,  -- KeyOpen event
   then=set(item=Cache,
            field=EventData.KeyObject,
            value=EventData.RelativeName),
   else=TRUE)
```

Note how `set()` can be used to add items to the cache and `get()`
is used to retrieve items.


