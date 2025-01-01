---
title: client_metadata
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## client_metadata
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>
<span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Returns client metadata from the datastore.

Client metadata is a set of free form key/value data. Artifacts
may use this metdata or it may simply be used as part of your IR
processes.

### See also

- [client_set_metadata]({{< ref "/vql_reference/server/client_set_metadata/" >}}):
  Sets client metadata.


