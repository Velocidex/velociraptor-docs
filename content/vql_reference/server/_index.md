---
title: Server Side
weight: 40
linktitle: Server
index: true
---

Velociraptor provides complete control of the server within VQL
queries. On the server, the VQL engine contains the following
plugins and functions. You can use this functionality to manage
and automate the server by writing VQL queries.

To reuse server side artifacts, simply create an artifact with
`type: SERVER` and launch it from the "Server Artifacts" screen in
the GUI.


<div class="vql_item"></div>


## artifact_definitions
<span class='vql_type pull-right'>Plugin</span>

Dump artifact definitions.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
names|Artifact definitions to dump|list of string
deps|If true includes all dependencies as well.|bool
sanitize|If true we remove extra metadata.|bool



<div class="vql_item"></div>


## artifact_delete
<span class='vql_type pull-right'>Function</span>

Deletes an artifact from the global repository.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|The Artifact to delete|string



<div class="vql_item"></div>


## artifact_set
<span class='vql_type pull-right'>Function</span>

Sets an artifact into the global repository.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
definition|Artifact definition in YAML|string
prefix|Required name prefix|string



<div class="vql_item"></div>


## cancel_flow
<span class='vql_type pull-right'>Function</span>

Cancels the flow.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string



<div class="vql_item"></div>


## client_delete
<span class='vql_type pull-right'>Plugin</span>

Delete all information related to a client. 



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
really_do_it||bool



<div class="vql_item"></div>


## client_info
<span class='vql_type pull-right'>Function</span>

Returns client info (like the fqdn) from the datastore.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)



<div class="vql_item"></div>


## client_metadata
<span class='vql_type pull-right'>Function</span>

Returns client metadata from the datastore. Client metadata is a set of free form key/value data



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)



<div class="vql_item"></div>


## client_set_metadata
<span class='vql_type pull-right'>Function</span>

Sets client metadata. Client metadata is a set of free form key/value data



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)



<div class="vql_item"></div>


## clients
<span class='vql_type pull-right'>Plugin</span>

Retrieve the list of clients.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
search|Client search string. Can have the following prefixes: 'lable:', 'host:'|string
start|First client to fetch (0)'|uint64
count|Maximum number of clients to fetch (1000)'|uint64
client_id||string



<div class="vql_item"></div>


## collect_client
<span class='vql_type pull-right'>Function</span>

Launch an artifact collection against a client. If the client_id
is "server" then the collection occurs on the server itself. In
that case the caller needs the SERVER_ADMIN permission.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to schedule a collection on|string (required)
artifacts|A list of artifacts to collect|list of string (required)
env|Parameters to apply to the artifact (an alternative to a full spec)|Any
spec|Parameters to apply to the artifacts|Any
timeout|Set query timeout (default 10 min)|uint64
ops_per_sec|Set query ops_per_sec value|float64
max_rows|Max number of rows to fetch|uint64
max_bytes|Max number of bytes to upload|uint64



<div class="vql_item"></div>


## compress
<span class='vql_type pull-right'>Function</span>

Compress a file in the server's FileStore. A compressed
file is archived so it takes less space. It is still possible to see
the file and read it but not to seek within it.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|A VFS path to compress|list of string (required)



<div class="vql_item"></div>


## create_flow_download
<span class='vql_type pull-right'>Function</span>

Creates a download pack for the flow.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|Client ID to export.|string (required)
flow_id|The flow id to export.|string (required)
wait|If set we wait for the download to complete before returning.|bool
type|Type of download to create (e.g. 'report') default a full zip file.|string
template|Report template to use (defaults to Reporting.Default).|string



<div class="vql_item"></div>


## create_hunt_download
<span class='vql_type pull-right'>Function</span>

Creates a download pack for a hunt.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id|Hunt ID to export.|string (required)
only_combined|If set we only export combined results.|bool
wait|If set we wait for the download to complete before returning.|bool
format|Format to export (csv,json) defaults to both.|string
base|Base filename to write to.|string



<div class="vql_item"></div>


## elastic_upload
<span class='vql_type pull-right'>Plugin</span>

Upload rows to elastic.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for rows to upload.|StoredQuery (required)
threads|How many threads to use.|int64
index|The name of the index to upload to. If not specified ensure a column is named '_index'.|string
type|The type of the index to upload to.|string (required)
chunk_size|The number of rows to send at the time.|int64
addresses|A list of Elasticsearch nodes to use.|list of string
username|Username for HTTP Basic Authentication.|string
password|Password for HTTP Basic Authentication.|string
cloud_id|Endpoint for the Elastic Service (https://elastic.co/cloud).|string
api_key|Base64-encoded token for authorization; if set, overrides username and password.|string
wait_time|Batch elastic upload this long (2 sec).|int64
pipeline|Pipeline for uploads|string



<div class="vql_item"></div>


## enumerate_flow
<span class='vql_type pull-right'>Plugin</span>

Enumerate all the files that make up a flow.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string



<div class="vql_item"></div>


## file_store
<span class='vql_type pull-right'>Function</span>

Resolves file store paths into full filesystem paths.

This function is only available on the server. It can be used to
find the backing file behind a filestore path so it can be passed
on to an external program.

Velociraptor uses the concept of a Virtual File System to manage the
information about clients etc. The VFS path is a path into the file
store. Of course ultimately (at least in the current implementation)
the file store is storing files on disk, but the disk filename is not
necessarily the same as the VFS path (for example non representable
characters are escaped).

You can use the `file_store()` function to return the real file path
on disk. This probably only makes sense for VQL queries running on the
server which can independently open the file.

In future the file store may be abstracted (e.g. files may not be
locally stored at all) and this function may stop working.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|A VFS path to convert|list of string (required)



<div class="vql_item"></div>


## file_store_delete
<span class='vql_type pull-right'>Function</span>

Delete file store paths into full filesystem paths. 



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|A VFS path to remove|string (required)



<div class="vql_item"></div>


## flow_results
<span class='vql_type pull-right'>Plugin</span>

Retrieve the results of a flow.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact to retrieve|string
source|An optional source within the artifact.|string
flow_id|The hunt id to read.|string (required)
client_id|The client id to extract|string (required)



<div class="vql_item"></div>


## flows
<span class='vql_type pull-right'>Plugin</span>

Retrieve the flows launched on each client.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string



<div class="vql_item"></div>


## get_client_monitoring
<span class='vql_type pull-right'>Function</span>

Retrieve the current client monitoring state.



<div class="vql_item"></div>


## get_server_monitoring
<span class='vql_type pull-right'>Function</span>

Retrieve the current client monitoring state.



<div class="vql_item"></div>


## gui_users
<span class='vql_type pull-right'>Plugin</span>

Retrieve the list of users on the server.



<div class="vql_item"></div>


## hunt
<span class='vql_type pull-right'>Function</span>

Launch an artifact collection against a client.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
description|Description of the hunt|string (required)
artifacts|A list of artifacts to collect|list of string (required)
expires|Number of milliseconds since epoch for expiry|uint64
spec|Parameters to apply to the artifacts|Any
timeout|Set query timeout (default 10 min)|uint64
ops_per_sec|Set query ops_per_sec value|float64
max_rows|Max number of rows to fetch|uint64
max_bytes|Max number of bytes to upload|uint64
pause|If specified the new hunt will be in the paused state|bool



<div class="vql_item"></div>


## hunt_add
<span class='vql_type pull-right'>Function</span>

Assign a client to a hunt.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
ClientId||string (required)
HuntId||string (required)



<div class="vql_item"></div>


## hunt_flows
<span class='vql_type pull-right'>Plugin</span>

Retrieve the flows launched by a hunt.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id|The hunt id to inspect.|string (required)
start_row|The first row to show (used for paging).|int64
limit|Number of rows to show (used for paging).|int64



<div class="vql_item"></div>


## hunt_results
<span class='vql_type pull-right'>Plugin</span>

Retrieve the results of a hunt.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact to retrieve|string
source|An optional source within the artifact.|string
hunt_id|The hunt id to read.|string (required)
brief|If set we return less columns.|bool



<div class="vql_item"></div>


## hunts
<span class='vql_type pull-right'>Plugin</span>

Retrieve the list of hunts.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id|A hunt id to read, if not specified we list all of them.|string



<div class="vql_item"></div>


## inventory
<span class='vql_type pull-right'>Plugin</span>

Retrieve the tools inventory.



<div class="vql_item"></div>


## inventory_add
<span class='vql_type pull-right'>Function</span>

Add tool to ThirdParty inventory.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
tool||string (required)
serve_locally||bool
url||string
hash||string
filename|The name of the file on the endpoint|string
file|An optional file to upload|string
accessor|The accessor to use to read the file.|string



<div class="vql_item"></div>


## inventory_get
<span class='vql_type pull-right'>Function</span>

Get tool info from inventory service.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
tool||string (required)



<div class="vql_item"></div>


## label
<span class='vql_type pull-right'>Function</span>

Add the labels to the client. If op is 'remove' then remove these labels.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|Client ID to label.|string (required)
labels|A list of labels to apply|list of string (required)
op|An operation on the labels (set, check, remove)|string



<div class="vql_item"></div>


## mail
<span class='vql_type pull-right'>Plugin</span>

Send Email to a remote server.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
to|Receipient of the mail|list of string (required)
cc|A cc for the mail|list of string
subject|The subject.|string
body|The body of the mail.|string (required)
period|How long to wait before sending the next mail - help to throttle mails.|int64 (required)



<div class="vql_item"></div>


## monitoring
<span class='vql_type pull-right'>Plugin</span>

Extract monitoring log from a client. If client_id is not specified we watch the global journal which contains event logs from all clients.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The event artifact name to watch|string (required)



<div class="vql_item"></div>


## notebook_delete
<span class='vql_type pull-right'>Plugin</span>

Delete a notebook with all its cells. 



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
notebook_id||string (required)
really_do_it||bool



<div class="vql_item"></div>


## parallelize
<span class='vql_type pull-right'>Plugin</span>

Runs query on result batches in parallel.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|The query will be run in parallel over batches.|StoredQuery (required)
client_id|The client id to extract|string
flow_id|A flow ID (client or server artifacts)|string
hunt_id|Retrieve sources from this hunt (combines all results from all clients)|string
artifact|The name of the artifact collection to fetch|string
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|int64
end_time|Stop end events reach this time (event sources).|int64
notebook_id|The notebook to read from (shoud also include cell id)|string
notebook_cell_id|The notebook cell read from (shoud also include notebook id)|string
notebook_cell_table|A notebook cell can have multiple tables.)|int64
workers|Number of workers to spawn.)|int64
batch|Number of rows in each batch.)|int64



<div class="vql_item"></div>


## patch
<span class='vql_type pull-right'>Function</span>

Patch a JSON object with a json patch or merge.

The function allows for modifications of objects by way of
applying a json patch. You can read more about JSON patching here
https://github.com/evanphx/json-patch.

I practice you can use this to update server settings - for
example, consider the client event monitoring state.

```text
SELECT get_client_monitoring() FROM scope()

 [
  {
   "get_client_monitoring": {
    "artifacts": [
     "Generic.Client.Stats"
    ]
   }
  }
 ]
```

Suppose we wish to add a new artifact, we can patch it with the json:
```json
[{"op": "add", "path": "/artifacts/0", "value": "Windows.Events.DNSQueries"}]
```

This can then be immediately pushed to `set_client_monitoring()`
to update the monitoring state.

```
SELECT set_client_monitoring(value=patch(
       item=get_client_monitoring(),
       patch=[dict(op="add", path="/artifacts/0", value="Windows.Events.DNSQueries")]))
FROM scope()
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item|The item to path|Any (required)
patch|A JSON Patch to apply|Any
merge|A merge-patch to apply|Any



<div class="vql_item"></div>


## rate
<span class='vql_type pull-right'>Function</span>

Calculates the rate (derivative) between two quantities.

For example if a monitoring plugin returns an absolute value
sampled in time (e.g. bytes transferred sampled every second) then
the rate() plugin can calculate the average bytes/sec.

This function works by remembering the values of x and y from the
previous row and applying the current rows values.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
x|The X float|float64 (required)
y|The Y float|float64 (required)



<div class="vql_item"></div>


## sample
<span class='vql_type pull-right'>Plugin</span>

Executes 'query' and samples every n'th row.

This is most useful on the server in order to downsample event
artifact results.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source query.|StoredQuery (required)
n|Pick every n row from query.|int64 (required)



<div class="vql_item"></div>


## search
<span class='vql_type pull-right'>Plugin</span>

Search the server client's index.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|The query string.|string
offset|Skip this many results.|uint64
limit|Only return limited results|uint64
type|The type of search (e.g. 'key')|string



<div class="vql_item"></div>


## server_metadata
<span class='vql_type pull-right'>Function</span>

Returns client metadata from the datastore. Client metadata is a set of free form key/value data



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)



<div class="vql_item"></div>


## server_set_metadata
<span class='vql_type pull-right'>Function</span>

Sets client metadata. Client metadata is a set of free form key/value data



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)



<div class="vql_item"></div>


## set_client_monitoring
<span class='vql_type pull-right'>Function</span>

Sets the current client monitoring state.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
value|The Value to set|Any (required)



<div class="vql_item"></div>


## set_server_monitoring
<span class='vql_type pull-right'>Function</span>

Sets the current server monitoring state.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
value|The Value to set|Any (required)



<div class="vql_item"></div>


## source
<span class='vql_type pull-right'>Plugin</span>

Retrieve rows from an artifact's source.

This plugin is mostly useful in reports. It attempts to do the
right thing automatically by inferring most parameters from its
execution environment.

For example when called within a CLIENT report context, it will
automatically fill its flow id, client id etc. Typically this
means that you only need to specify the source name (for
multi-source artifacts).




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string
flow_id|A flow ID (client or server artifacts)|string
hunt_id|Retrieve sources from this hunt (combines all results from all clients)|string
artifact|The name of the artifact collection to fetch|string
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|int64
end_time|Stop end events reach this time (event sources).|int64
notebook_id|The notebook to read from (shoud also include cell id)|string
notebook_cell_id|The notebook cell read from (shoud also include notebook id)|string
notebook_cell_table|A notebook cell can have multiple tables.)|int64
start_row|Start reading the result set from this row|int64
count|Maximum number of clients to fetch (default unlimited)'|int64



<div class="vql_item"></div>


## splunk_upload
<span class='vql_type pull-right'>Plugin</span>

Upload rows to splunk.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for rows to upload.|StoredQuery (required)
threads|How many threads to use.|int64
url|The Splunk Event Collector URL.|string
token|Splunk HEC Token.|string
index|The name of the index to upload to.|string (required)
source|The source field for splunk. If not specified this will be 'velociraptor'.|string
sourcetype|The sourcetype field for splunk. If not specified this will 'vql'|string
chunk_size|The number of rows to send at the time.|int64
skip_verify|Skip SSL verification(default: False).|bool
wait_time|Batch splunk upload this long (2 sec).|int64



<div class="vql_item"></div>


## uploads
<span class='vql_type pull-right'>Plugin</span>

Retrieve information about a flow's uploads.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string
flow_id|A flow ID (client or server artifacts)|string

