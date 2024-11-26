---
title: pipe
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pipe
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Read from a VQL pipe.

**NOTE: this is not the same as a windows named pipe**.

A VQL pipe allows data to be generated from a VQL query, as the
pipe is read, the query proceeds to feed more data to it.

### Example

```vql
LET MyPipe = pipe(query={
        SELECT _value FROM range(start=0, end=10, step=1)
}, sep="\n")

SELECT read_file(filename="MyPipe", accessor="pipe")
FROM scope()
```

It is mostly useful for redirecting the output of one query to
another without using temp files. You probably do not want to use
it!


