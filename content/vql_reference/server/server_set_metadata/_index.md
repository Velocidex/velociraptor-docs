---
title: server_set_metadata
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## server_set_metadata
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
metadata|A dict containing metadata. If not specified we use kwargs.|ordereddict.Dict

### Description

Sets server metadata. Server metadata is a set of free form
key/value data, usually used for configuration of artifacts.

### Example

```vql
SELECT server_set_metadata(`Slack Token`="X12233")
FROM scope()
```


