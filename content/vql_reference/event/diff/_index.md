---
title: diff
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## diff
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for cached rows.|StoredQuery (required)
key|The column to use as key.|string (required)
period|Number of seconds between evaluation of the query.|int64

### Description

Executes 'query' periodically and emit differences from the last query.

The `diff()` plugin runs a non-event query periodically and calculates
the difference between its result set from the last run.

This can be used to create event queries which watch for changes from
simpler non-event queries.

The `key` parameter is the name of the column which is used to
determine row equivalency.

{{% notice note %}}

There is only a single equivalence column specified by the `key`
parameter, and it must be a string. If you need to watch multiple
columns you need to create a new column which is the concatenation
of other columns. For example `format(format="%s%d", args=[Name,
Pid])`

{{% /notice %}}

### Example

The following VQL monitors all removable drives and lists files on
newly inserted drives, or files that have been added to removable
drives.

```vql
LET removable_disks = SELECT Name AS Drive, Size
FROM glob(globs="/*", accessor="file")
WHERE Data.Description =~ "Removable"

LET file_listing = SELECT FullPath, Mtime As Modified, Size
FROM glob(globs=Drive+"\\**", accessor="file") LIMIT 1000

SELECT * FROM diff(
  query={ SELECT * FROM foreach(row=removable_disks, query=file_listing) },
  key="FullPath",
  period=10)
  WHERE Diff = "added"
```

### Example - waiting for process exit

Although `diff()` is primarily an event query it can also be
useful in regular client side VQL. For example we might need to
wait for a process to exit before continuing. The following query
blocks until the process list does not contain a process matching
the regex.

```vql
SELECT * FROM diff(key="Name", period=1, query={
   SELECT Name FROM pslist()
   WHERE Name =~ ProcessRegex
})
WHERE Diff =~ "removed"
LIMIT 1
```

This query:

1. Diff will list processes every second looking for process name
   matching the regex.
2. When a process is added or removed, the diff plugin will emit a
   row
3. The query is only interested in a removed process
4. After a single removed process is found the limit is reached
   and the query exits.

Sometimes we need to wait for a subprocess to exist if it detaches
from the terminal immediately but does some work in the background.


