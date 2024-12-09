---
title: unhex
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## unhex
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|Hex string to decode|string

### Description

Apply hex decoding to the string.

A hex encoded string consists of two hex digits per byte -
therefore valid hex encoded strings have an even length.

For example: "01230F0a"

Note: If you need to encode a string as hex encoded string you can
use the format function:

```vql
format(format="%02x", args="Hello") -> "48656c6c6f"
```


