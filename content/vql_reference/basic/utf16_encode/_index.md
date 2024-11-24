---
title: utf16_encode
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## utf16_encode
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)

### Description

Encode a string to utf16 bytes.

### Example

```vql
utf16_encode(string="ABCD") -> "A\u0000B\u0000C\u0000D\u0000"
```


