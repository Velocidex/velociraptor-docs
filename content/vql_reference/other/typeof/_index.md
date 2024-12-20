---
title: typeof
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## typeof
<span class='vql_type label label-warning pull-right page-header'>Function</span>


### Description

Print the underlying Go type of the variable.

You can use any argument name. So `typeof(x=my_var)` and
`typeof(fluffydinosaur=my_var)` are equivalent.

Only the first argument provided will be evaluated and returned.

### Examples

```vql
SELECT typeof(x=1) AS Type FROM scope()
```
returns: `Type: int64`

```vql
LET my_time <= timestamp(epoch="2024-03-26T06:53:37Z")
SELECT typeof(thing=my_time) AS Type FROM scope()
```
returns: `Type: time.Time`

### Notes

The `typeof` function is a more concise alternative to using the more
flexible and more powerful `format` function:

```vql
SELECT format(format="%T", args=x) AS Type FROM scope()
```

The `typeof` function is often used to inspect the data type of returned
values when writing and testing VQL.

It is also useful as a row filter by including it in the WHERE clause of
a query to ensure that a specific column does not contain values of an
unexpected data type.

### See also

- [format]({{< ref "/vql_reference/popular/format/" >}})


