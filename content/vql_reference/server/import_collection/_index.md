---
title: import_collection
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## import_collection
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to import to. Use 'auto' to generate a new client id or use the host info from the collection.|string
hostname|When creating a new client, set this as the hostname.|string
filename|Path on server to the collector zip.|string (required)
accessor|The accessor to use.|string
import_type|Whether the import is an offline_collector or hunt.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_SERVER</span>
<span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Imports an offline collection zip file (experimental).

Offline collectors are preconfigure Velociraptor binaries that
collect specific artifacts into a zip file.

This function allows such a collection to be imported into the GUI
as if it was collected by the server. The collection will be
loaded into a client's filestore directory.

Since there is no actual client id associated with the offline
collection (there is no Velociraptor client running on the
endpoint) we generate a random client ID for a new client.

If you specify an existing client id, the collection will be
uploaded into that client.

### Notes

Combine this function with the hunt_add() function to add a
manual offline collection to an ongoing hunt.


