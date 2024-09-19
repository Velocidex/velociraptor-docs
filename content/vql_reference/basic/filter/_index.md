---
title: filter
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## filter
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
list|A list of items to filter|list of Any (required)
regex|A regex to test each item|string
condition|A VQL lambda to use to filter elements|Lambda

### Description

Filters an array by regex or condition.

Note that if a condition is specified as well as a regex then only
the condition is applied.

### Examples

```vql
filter(list=["AA", "AB", "BA", "BB"], regex="^A") -> ["AA", "AB"]
```

```vql
filter(list=[1, 2, 3, 4, 5, 6], condition="x=>x > 3") -> [4, 5, 6]
```


