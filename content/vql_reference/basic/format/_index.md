---
title: format
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## format
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
format|Format string to use|string (required)
args|An array of elements to apply into the format string.|Any

### Description

Format one or more items according to a format string.

This function is essentially a wrapper around Golang's
fmt.Sprintf() function and uses the same format specifiers.

https://pkg.go.dev/fmt

Of note the following are very useful:

* The `% x` applied on strings will hex print the string
* The `%T` will reveal the internal type of an object.
* The `%v` is the general purpose stringifier and can apply to strings, ints etc.


