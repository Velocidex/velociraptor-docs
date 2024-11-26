---
title: server_set_metadata
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## server_set_metadata
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
metadata|A dict containing metadata. If not specified we use kwargs.|ordereddict.Dict

### Description

Sets server metadata. Server metadata is a set of free form
key/value data, usually used for configuration of artifacts.

For existing keys, the value is overwritten. Setting a metadata
key with a `NULL` value deletes that entry.

### Example

```vql
SELECT server_set_metadata(`Slack Token`="X12233")
FROM scope()
```


