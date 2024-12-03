---
title: client_set_metadata
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## client_set_metadata
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
metadata|A dict containing metadata. If not specified we use kwargs.|ordereddict.Dict

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_CLIENT</span>
<span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Sets client metadata.

Client metadata is a set of free form key/value data (see
client_metadata() function).

For existing keys, the value is overwritten. Setting a metadata
key with a `NULL` value deletes that entry.

### Example

```vql
SELECT client_set_metadata(ClientId="C.1234", Foo="Bar")
FROM scope()
```


