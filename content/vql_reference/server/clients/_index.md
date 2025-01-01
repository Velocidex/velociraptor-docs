---
title: clients
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## clients
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
search|Client search string. Can have the following prefixes: 'label:', 'host:'|string
client_id||string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>

### Description

Returns client info for one or more clients from the datastore.

This plugin is typically used when needing to iterate of the list of
clients.

The `search` argument allows search expressions analogous to those in the
GUI's client search bar.

The information returned for each client is the same as is returned by the
`client_info()` function. If you are retrieving information for a specific
client then you may want to consider using that instead.

### See also

- [client_info]({{< ref "/vql_reference/server/client_info/" >}}): Returns
  client info for a specific client from the datastore.


