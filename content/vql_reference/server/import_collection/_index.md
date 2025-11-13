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

Imports a collection zip file .

Collection zip files can be obtained from the offline collector or
by creating a download of a flow or hunt in the GUI (see
`create_hunt_download()` or `create_flow_download()` )

If the collection is a hunt export, the hunt object is restored
and all the individual client flows are also imported into their
respective client id.

This function allows such a collection to be imported into the GUI
as if it was collected by the server. The collection will be
loaded into a client's filestore directory.

If you specify an existing client id, the collection will be
uploaded into that client.

When the client id is not specified or "auto", the client is
calculated according to the following rules:

1. If the collection contains a client id (i.e. it is a flow
   export), and the client id exists on this server, then we use
   that client id.

2. If the collection contains a hostname and that hostname exists
   on this server, then we use the client id corresponding to this
   host.

3. If the collection contains a host id, we create a client id
   based on that.

4. Otherwise we create a random client id.

This ensure that collections are added to existing known clients
as much as possible. If two offline collections are made for the
same host, they should automatically be added to the same client
id.

### Notes

Combine this function with the hunt_add() function to add a
manual offline collection to an ongoing hunt.


