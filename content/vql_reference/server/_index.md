---
title: Server Side
weight: 40
linktitle: Server
index: true
no_edit: true
no_children: true
---

Velociraptor provides complete control of the server within VQL
queries. On the server, the VQL engine contains the following
plugins and functions. You can use this functionality to manage
and automate the server by writing VQL queries.

To reuse server side artifacts, simply create an artifact with
`type: SERVER` and launch it from the "Server Artifacts" screen in
the GUI.
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[add_client_monitoring](add_client_monitoring)|<span class='vql_type'>Function</span>|Adds a new artifact to the client monitoring table|
|[add_server_monitoring](add_server_monitoring)|<span class='vql_type'>Function</span>|Adds a new artifact to the server monitoring table|
|[artifact_definitions](artifact_definitions)|<span class='vql_type'>Plugin</span>|Dump artifact definitions from the internal repository|
|[artifact_delete](artifact_delete)|<span class='vql_type'>Function</span>|Deletes an artifact from the global repository|
|[artifact_set](artifact_set)|<span class='vql_type'>Function</span>|Sets an artifact into the global repository|
|[cancel_flow](cancel_flow)|<span class='vql_type'>Function</span>|Cancels the flow|
|[cidr_contains](cidr_contains)|<span class='vql_type'>Function</span>|Calculates if an IP address falls within a range of CIDR specified|
|[client_delete](client_delete)|<span class='vql_type'>Plugin</span>|Delete all information related to a client from the filestore|
|[client_info](client_info)|<span class='vql_type'>Function</span>|Returns client info (like the fqdn) from the datastore|
|[client_metadata](client_metadata)|<span class='vql_type'>Function</span>|Returns client metadata from the datastore|
|[client_set_metadata](client_set_metadata)|<span class='vql_type'>Function</span>|Sets client metadata|
|[clients](clients)|<span class='vql_type'>Plugin</span>|Retrieve the list of clients|
|[collect_client](collect_client)|<span class='vql_type'>Function</span>|Launch an artifact collection against a client|
|[compress](compress)|<span class='vql_type'>Function</span>|Compress a file|
|[create_flow_download](create_flow_download)|<span class='vql_type'>Function</span>|Creates a download pack for the flow|
|[create_hunt_download](create_hunt_download)|<span class='vql_type'>Function</span>|Creates a download pack for a hunt|
|[elastic_upload](elastic_upload)|<span class='vql_type'>Plugin</span>|Upload rows to elastic|
|[enumerate_flow](enumerate_flow)|<span class='vql_type'>Plugin</span>|Enumerate all the files that make up a flow|
|[favorites_delete](favorites_delete)|<span class='vql_type'>Function</span>|Delete a favorite|
|[favorites_save](favorites_save)|<span class='vql_type'>Function</span>|Save a collection into the favorites|
|[file_store](file_store)|<span class='vql_type'>Function</span>|Resolves file store paths into full filesystem paths|
|[file_store_delete](file_store_delete)|<span class='vql_type'>Function</span>|Delete file store paths|
|[flow_results](flow_results)|<span class='vql_type'>Plugin</span>|Retrieve the results of a flow|
|[flows](flows)|<span class='vql_type'>Plugin</span>|Retrieve the flows launched on each client|
|[gcs_pubsub_publish](gcs_pubsub_publish)|<span class='vql_type'>Function</span>|Publish a message to Google PubSub|
|[geoip](geoip)|<span class='vql_type'>Function</span>|Lookup an IP Address using the MaxMind GeoIP database|
|[get_client_monitoring](get_client_monitoring)|<span class='vql_type'>Function</span>|Retrieve the current client monitoring state|
|[get_server_monitoring](get_server_monitoring)|<span class='vql_type'>Function</span>|Retrieve the current server monitoring state|
|[gui_users](gui_users)|<span class='vql_type'>Plugin</span>|Retrieve the list of users on the server|
|[hunt](hunt)|<span class='vql_type'>Function</span>|Create and launch a hunt|
|[hunt_add](hunt_add)|<span class='vql_type'>Function</span>|Assign a client to a hunt|
|[hunt_flows](hunt_flows)|<span class='vql_type'>Plugin</span>|Retrieve the flows launched by a hunt|
|[hunt_results](hunt_results)|<span class='vql_type'>Plugin</span>|Retrieve the results of a hunt|
|[hunts](hunts)|<span class='vql_type'>Plugin</span>|Retrieve the list of hunts|
|[import_collection](import_collection)|<span class='vql_type'>Function</span>|Imports an offline collection zip file (experimental)|
|[inventory](inventory)|<span class='vql_type'>Plugin</span>|Retrieve the tools inventory|
|[inventory_add](inventory_add)|<span class='vql_type'>Function</span>|Add or reconfigure a tool into the inventory|
|[inventory_get](inventory_get)|<span class='vql_type'>Function</span>|Get tool info from inventory service|
|[label](label)|<span class='vql_type'>Function</span>|Add the labels to the client|
|[mail](mail)|<span class='vql_type'>Plugin</span>|Send Email to a remote server|
|[monitoring](monitoring)|<span class='vql_type'>Plugin</span>|Extract monitoring log from a client|
|[notebook_delete](notebook_delete)|<span class='vql_type'>Plugin</span>|Delete a notebook with all its cells|
|[parallelize](parallelize)|<span class='vql_type'>Plugin</span>|Runs query on result batches in parallel|
|[patch](patch)|<span class='vql_type'>Function</span>|Patch a JSON object with a json patch or merge|
|[rate](rate)|<span class='vql_type'>Function</span>|Calculates the rate (derivative) between two quantities|
|[rm_client_monitoring](rm_client_monitoring)|<span class='vql_type'>Function</span>|Remove an artifact from the client monitoring table|
|[rm_server_monitoring](rm_server_monitoring)|<span class='vql_type'>Function</span>|Remove an artifact from the server monitoring table|
|[sample](sample)|<span class='vql_type'>Plugin</span>|Executes 'query' and samples every n'th row|
|[server_metadata](server_metadata)|<span class='vql_type'>Function</span>|Returns server metadata from the datastore|
|[server_set_metadata](server_set_metadata)|<span class='vql_type'>Function</span>|Sets server metadata|
|[set_client_monitoring](set_client_monitoring)|<span class='vql_type'>Function</span>|Sets the current client monitoring state|
|[set_server_monitoring](set_server_monitoring)|<span class='vql_type'>Function</span>|Sets the current server monitoring state|
|[source](source)|<span class='vql_type'>Plugin</span>|Retrieve rows from an artifact's source|
|[splunk_upload](splunk_upload)|<span class='vql_type'>Plugin</span>|Upload rows to splunk|
|[timeline](timeline)|<span class='vql_type'>Plugin</span>|Read a timeline|
|[timeline_add](timeline_add)|<span class='vql_type'>Function</span>|Add a new query to a timeline|
|[upload_directory](upload_directory)|<span class='vql_type'>Function</span>|Upload a file to an upload directory|
|[uploads](uploads)|<span class='vql_type'>Plugin</span>|Retrieve information about a flow's uploads|
|[user_create](user_create)|<span class='vql_type'>Function</span>|Creates a new user from the server, or updates their permissions or reset their password|
|[user_delete](user_delete)|<span class='vql_type'>Function</span>|Deletes a user from the server|
