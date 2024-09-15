---
title: atexit
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## atexit
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|Any (required)
env|A dict of args to insert into the scope.|ordereddict.Dict
timeout|How long to wait for destructors to run (default 60 seconds).|uint64

### Description

Install a query to run when the query is unwound. This is used to
clean up when the query ends.

### Example

```vql
LET _ <= atexit(query={
  SELECT rm(filename="Foobar.txt") FROM scope()
})
```


