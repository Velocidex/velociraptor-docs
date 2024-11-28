---
title: client_info
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## client_info
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)

Required Permissions: 
<span class="linkcolour label label-success">READ_RESULTS</span>

### Description

Returns client info (like the fqdn) from the datastore.

Velociraptor maintains basic information about the client in the
data store, such as its hostname, OS etc.

You can use this function to enrich information about clients in
VQL output. NOTE: This function queries the internal in-memory
database so it is very fast and suitable to be called frequently
on each row.

### Example - enriching hostnames

Internally, Velociraptor uses client id to uniquely identify the
client. But often we want to provide a hostname as well. In the
below we look at collection output from the `source()` plugin and
add an additional Hostname column by resolving the client id on
each row to its hostname.

```vql
SELECT *,
   client_info(client_id=client_id).os_info.hostname AS Hostname
FROM source()
```


