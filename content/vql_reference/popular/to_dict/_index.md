---
title: to_dict
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## to_dict
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any

### Description

Construct a dict from a query.

Sometimes we need to build a dict object where both the names of
the keys and their values are not known in advance - they are
calculated from another query. In this case we can use the
to_dict() function to build a dict from a query. The query needs
to emits as many rows as needed with a column called `_key` and
one called `_value`. The `to_dict()` will then construct a dict
from this query.

### Notes

1. In VQL all dicts are ordered, so the order in which rows appear
in the query will determine the dict's key order.

2. VQL dicts always have string keys, if the `_key` value is not a
string the row will be ignored.

### Example

The following (rather silly) example creates a dict mapping Pid to
ProcessNames in order to cache Pid->Name lookups. We then resolve
Pid to Name within other queries. Note the use of <= to
materialize the dict into memory once.

```vql
LET PidLookup <= to_dict(item={
    SELECT str(str=Pid) AS _key, Name AS _value
    FROM pslist()
})

SELECT Pid, get(item=PidLookup, field=str(str=Pid))
FROM pslist()
```


