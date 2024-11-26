---
title: pipe
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pipe
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name to call the pipe|string
query|Run this query to generator data - the first column will be appended to pipe data.|StoredQuery
sep|The separator that will be used to split each read (default: no separator will be used)|string

### Description

A pipe allows plugins that use files to read data from a vql
query.

**NOTE: this is not the same as a windows named pipe**.

This is needed to be able to use the "pipe" accessor.

### Example

In the following example we create a pipe from a query which
reads a log file line by line. Each line is being transformed by
a regex and potentially filtered (perhaps to fix up buggy CSV
implementations that generated a bad CSV).

The pipe is then fed into the parse_csv() plugin to parse each
line as a csv file.

```vql
LET MyPipe = pipe(query={
    SELECT regex_replace(
      re='''^(\d{4}-\d{2}-\d{2}) (\d{2}:)''',
      replace='''${1}T${2}''', source=Line) AS Line
    FROM parse_lines(filename=IISPath)
    WHERE NOT Line =~ "^#"
  }, sep="\n")

SELECT * FROM parse_csv(
   columns=Columns, separator=" ",
   filename="MyPipe", accessor="pipe")
```


