---
title: atoi
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## atoi
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to convert to int|Any (required)

### Description

Convert a string to an integer.

The string may begin with a sign ("+" or "-") and a prefix
indicating a base: "0b" for base2 , "0" or "0o" for base8, "0x"
for base16. It may contain underscores ("_").

This function is essentially a wrapper around Golang's
`strconv.ParseInt()` function.


