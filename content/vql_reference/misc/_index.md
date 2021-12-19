---
title: Misc
weight: 70
linktitle: Misc
index: true
---

Miscellaneous plugins not yet categorized.


<div class="vql_item"></div>


## netcat
<span class='vql_type pull-right'>Plugin</span>

Make a tcp connection and read data from a socket.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
address|The address to connect to (can be a file in case of a unix domain socket)|string (required)
type|Can be tcp or unix (default TCP)|string
send|Data to send before reading|string
sep|The separator that will be used to split (default - line feed)|string
chunk_size|Read input with this chunk size (default 64kb)|int
retry|Seconds to wait before retry - default 0 - do not retry|int



<div class="vql_item"></div>


## parse_pkcs7
<span class='vql_type pull-right'>Function</span>

Parse a DER encoded pkcs7 string into an object.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|PKCS7 DER encoded string.|string (required)



<div class="vql_item"></div>


## pipe
<span class='vql_type pull-right'>Function</span>

A pipe allows plugins that use files to read data from a vql
query. This is needed to be able to use the "pipe" accessor.

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




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name to call the pipe|string
query|Run this query to generator data - the first column will be appended to pipe data.|StoredQuery
sep|The separator that will be used to split each read (default: no separator will be used)|string



<div class="vql_item"></div>


## query
<span class='vql_type pull-right'>Plugin</span>

Evaluate a VQL query.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|string (required)
env|A dict of args to insert into the scope.|ordereddict.Dict
