---
title: dict
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## dict
<span class='vql_type label label-warning pull-right page-header'>Function</span>


### Description

Construct a dict from arbitrary keyword args.

This function creates a dictionary (a key/value map). NOTE: In VQL
dictionaries always have string keys. Sometimes key names contain
special characters like dots etc, in that case you can use
backticks to escape the name. For example:

```vql
SELECT dict(Foo="Bar", `Name.With.Dots`="Baz")
FROM scope()
```

See the `to_dict()` function to create dicts from a query with
unpredictable key names.


