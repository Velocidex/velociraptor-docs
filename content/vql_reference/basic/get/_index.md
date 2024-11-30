---
title: get
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## get
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any
member||string
field||Any
default||Any

### Description

Gets the member field from item.

This is useful to index an item from an array.

### Example

```vql
select get(item=[dict(foo=3), 2, 3, 4], member='0.foo') AS Foo from scope()
```
```json
[
  {
    "Foo": 3
  }
]
```

Using the member parameter you can index inside a nested
dictionary using dots to separate the layers.

If you need to access a field with dots in its name, you can use
the field parameter which simply fetches the named field.


