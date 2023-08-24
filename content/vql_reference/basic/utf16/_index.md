---
title: utf16
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## utf16
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)

### Description

Parse input from utf16.

### Example
```vql
utf16(string='A\x00B\x00C\x00D\x00') -> "ABCD"
```


