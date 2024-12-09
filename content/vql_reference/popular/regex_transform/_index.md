---
title: regex_transform
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## regex_transform
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
source|The source string to replace.|string (required)
map|A dict with keys reg, values substitutions.|ordereddict.Dict (required)
key|A key for caching|string

### Description

Search and replace a string with multiple regex. Note you can use $1
to replace the capture string.

```vql
SELECT regex_transform(source="Hello world", map=dict(
   `^Hello`="Goodbye",
   `world`="Space"), key="A")
FROM scope()
```


