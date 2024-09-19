---
title: strip
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## strip
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|The string to strip|string (required)
prefix|The prefix to strip|string
suffix|The suffix to strip|string

### Description

Strip prefix and/or suffix from a string

If neither prefix nor suffix are provided, leading and trailing
whitespace is stripped.

### Examples

```vql
strip(string=">>  lorem ipsum  <<", prefix=">>", suffix="<<") -> "  lorem ipsum  "
```

```vql
strip(string="   lorem ipsum   ") -> "lorem ipsum"
```


