---
title: items
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## items
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any

### Description

Iterate over dict members producing _key and _value columns

This can be used to filter dict items by feeding the results to
`to_dict()`




<div class="vql_item"></div>


## items
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item|The item to enumerate.|Any

### Description

Enumerate all members of the item (similar to Python's items() method).

This plugin allows iteration over dicts or queries.

### Iterating dicts

If the item is a dict, then this plugin will iterate over its keys
and values producing two columns:

* The `_key` column is the dictionary key
* The `_value` column is the dictionary value

### Iterating queries

For queries or arrays, the `items()` plugin will produce two columns:

* The `_key` column is the row index starting from 0
* The `_value` column is the row itself as a dict.

The `items()` query is useful to treat the results of another
query as a dict instead of a row. This is useful when the query
produces unpredictable columns or you need to operate over the
column names somehow.

### Example

```vql
SELECT * FROM items(item={ SELECT * FROM info() })
```

Produces:

```json
[
  {
    "_key": 0,
    "_value": {
      "Hostname": "DESKTOP-BTI2T9T",
      "Uptime": 20445,
      "BootTime": 1641029930,
      "Architecture": "amd64"
    }
  }
]
```


