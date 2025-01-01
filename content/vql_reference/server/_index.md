---
title: Server-only
weight: 40
linktitle: Server
index: true
no_edit: true
no_children: true
---

Velociraptor provides complete control of the server within VQL queries. On
the server the VQL engine contains the following plugins and functions
which you can use to manage and automate the server via VQL queries. Such
server-side VQL can be run via Server Artifacts, Notebooks, or the API.

{{% notice warning %}}

Since these rely on the server datastore and server services they are not
available on clients!

{{% /notice %}}
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[add_client_monitoring](add_client_monitoring)|<span class='vql_type'>Function</span>|Adds a new artifact to the client monitoring table|
|[add_server_monitoring](add_server_monitoring)|<span class='vql_type'>Function</span>|Adds a new artifact to the server monitoring table|
|[artifact_definitions](artifact_definitions)|<span class='vql_type'>Plugin</span>|Dump artifact definitions from the internal repository|
|[artifact_delete](artifact_delete)|<span class='vql_type'>Function</span>|Deletes an artifact from the global repository|
|[artifact_set](artifact_set)|<span class='vql_type'>Function</span>|Sets an artifact into the global repository|
|[artifact_set_metadata](artifact_set_metadata)|<span class='vql_type'>Function</span>|Sets metadata about the artifact|
|[backup](backup)|<span class='vql_type'>Plugin</span>|Generates a backup file|
|[backup_restore](backup_restore)|<span class='vql_type'>Plugin</span>|Restore state from a backup file|
|[cancel_flow](cancel_flow)|<span class='vql_type'>Function</span>|Cancels the flow|
|[client_create](client_create)|<span class='vql_type'>Function</span>|Create a new client in the data store|
|[client_delete](client_delete)|<span class='vql_type'>Plugin</span>|Delete all information related to a client from the filestore|
|[client_info](client_info)|<span class='vql_type'>Function</span>|Returns client info (like the fqdn) for a specific client from the|
|[client_metadata](client_metadata)|<span class='vql_type'>Function</span>|Returns client metadata from the datastore|
|[client_set_metadata](client_set_metadata)|<span class='vql_type'>Function</span>|Sets client metadata|
|[clients](clients)|<span class='vql_type'>Plugin</span>|Returns client info for one or more clients from the datastore|
|[collect_client](collect_client)|<span class='vql_type'>Function</span>|Launch an artifact collection against a client|
|[create_flow_download](create_flow_download)|<span class='vql_type'>Function</span>|Creates a download pack for the flow|
|[create_hunt_download](create_hunt_download)|<span class='vql_type'>Function</span>|Creates a download pack for a hunt|
|[create_notebook_download](create_notebook_download)|<span class='vql_type'>Function</span>|Creates a notebook export zip file|
|[delete_events](delete_events)|<span class='vql_type'>Plugin</span>|Delete events from a flow|
|[delete_flow](delete_flow)|<span class='vql_type'>Plugin</span>|Delete all the files that make up a flow|
|[enumerate_flow](enumerate_flow)|<span class='vql_type'>Plugin</span>|Enumerate all the files that make up a flow|
|[favorites_delete](favorites_delete)|<span class='vql_type'>Function</span>|Delete a favorite|
|[favorites_save](favorites_save)|<span class='vql_type'>Function</span>|Save a collection into the favorites|
|[file_store](file_store)|<span class='vql_type'>Function</span>|Resolves file store paths into full filesystem paths|
|[file_store_delete](file_store_delete)|<span class='vql_type'>Function</span>|Delete file store paths|
|[flow_logs](flow_logs)|<span class='vql_type'>Plugin</span>|Retrieve the query logs of a flow|
|[flow_results](flow_results)|<span class='vql_type'>Plugin</span>|Retrieve the results of a flow|
|[flows](flows)|<span class='vql_type'>Plugin</span>|Retrieve the flows launched on each client|
|[get_client_monitoring](get_client_monitoring)|<span class='vql_type'>Function</span>|Retrieve the current client monitoring state|
|[get_flow](get_flow)|<span class='vql_type'>Function</span>|Gets flow details|
|[get_server_monitoring](get_server_monitoring)|<span class='vql_type'>Function</span>|Retrieve the current server monitoring state|
|[gui_users](gui_users)|<span class='vql_type'>Plugin</span>|Retrieve the list of users on the server|
|[hunt](hunt)|<span class='vql_type'>Function</span>|Create and launch a hunt|
|[hunt_add](hunt_add)|<span class='vql_type'>Function</span>|Assign a client to a hunt|
|[hunt_delete](hunt_delete)|<span class='vql_type'>Plugin</span>|Delete a hunt|
|[hunt_flows](hunt_flows)|<span class='vql_type'>Plugin</span>|Retrieve the flows launched by a hunt|
|[hunt_info](hunt_info)|<span class='vql_type'>Function</span>|Retrieve the hunt information|
|[hunt_results](hunt_results)|<span class='vql_type'>Plugin</span>|Retrieve the results of a hunt|
|[hunt_update](hunt_update)|<span class='vql_type'>Function</span>|Update a hunt|
|[hunts](hunts)|<span class='vql_type'>Plugin</span>|Retrieve the list of hunts|
|[import](import)|<span class='vql_type'>Function</span>|Imports an artifact into the current scope|
|[import_collection](import_collection)|<span class='vql_type'>Function</span>|Imports an offline collection zip file (experimental)|
|[inventory](inventory)|<span class='vql_type'>Plugin</span>|Retrieve the tools inventory|
|[inventory_add](inventory_add)|<span class='vql_type'>Function</span>|Add or reconfigure a tool into the inventory|
|[inventory_get](inventory_get)|<span class='vql_type'>Function</span>|Get tool info from inventory service|
|[killkillkill](killkillkill)|<span class='vql_type'>Function</span>|Sends a kill message to the client and forces a restart - this is very aggressive!|
|[label](label)|<span class='vql_type'>Function</span>|Add the labels to the client|
|[link_to](link_to)|<span class='vql_type'>Function</span>|Create a url linking to a particular part in the Velociraptor GUI|
|[logging](logging)|<span class='vql_type'>Plugin</span>|Watch the logs emitted by the server|
|[mail](mail)|<span class='vql_type'>Plugin</span>|Send Email to a remote server|
|[monitoring](monitoring)|<span class='vql_type'>Plugin</span>|Extract monitoring log from a client|
|[monitoring_logs](monitoring_logs)|<span class='vql_type'>Plugin</span>|Retrieve log messages from client event monitoring for the specified client id and artifact|
|[notebook_create](notebook_create)|<span class='vql_type'>Function</span>|Create a new notebook|
|[notebook_delete](notebook_delete)|<span class='vql_type'>Plugin</span>|Delete a notebook with all its cells|
|[notebook_export](notebook_export)|<span class='vql_type'>Function</span>|Exports a notebook to a zip file or HTML|
|[notebook_get](notebook_get)|<span class='vql_type'>Function</span>|Get a notebook|
|[notebook_update](notebook_update)|<span class='vql_type'>Function</span>|Update a notebook metadata|
|[notebook_update_cell](notebook_update_cell)|<span class='vql_type'>Function</span>|Update a notebook cell|
|[org](org)|<span class='vql_type'>Function</span>|Return the details of the current org|
|[org_create](org_create)|<span class='vql_type'>Function</span>|Creates a new organization|
|[org_delete](org_delete)|<span class='vql_type'>Function</span>|Deletes an Org from the server|
|[orgs](orgs)|<span class='vql_type'>Plugin</span>|Retrieve the list of orgs on this server|
|[parallelize](parallelize)|<span class='vql_type'>Plugin</span>|Runs query on result batches in parallel|
|[passwd](passwd)|<span class='vql_type'>Function</span>|Updates the user's password|
|[query](query)|<span class='vql_type'>Plugin</span>|Evaluate a VQL query|
|[repack](repack)|<span class='vql_type'>Function</span>|Repack and upload a repacked binary or MSI to the server|
|[rm_client_monitoring](rm_client_monitoring)|<span class='vql_type'>Function</span>|Remove an artifact from the client monitoring table|
|[rm_server_monitoring](rm_server_monitoring)|<span class='vql_type'>Function</span>|Remove an artifact from the server monitoring table|
|[send_event](send_event)|<span class='vql_type'>Function</span>|Sends an event to a server event monitoring queue|
|[server_frontend_cert](server_frontend_cert)|<span class='vql_type'>Function</span>|Get Server Frontend Certificate|
|[server_metadata](server_metadata)|<span class='vql_type'>Function</span>|Returns server metadata from the datastore|
|[server_set_metadata](server_set_metadata)|<span class='vql_type'>Function</span>|Sets server metadata|
|[set_client_monitoring](set_client_monitoring)|<span class='vql_type'>Function</span>|Sets the current client monitoring state|
|[set_server_monitoring](set_server_monitoring)|<span class='vql_type'>Function</span>|Sets the current server monitoring state|
|[source](source)|<span class='vql_type'>Plugin</span>|Retrieve rows from an artifact's source|
|[timeline](timeline)|<span class='vql_type'>Plugin</span>|Read a timeline|
|[timeline_add](timeline_add)|<span class='vql_type'>Function</span>|Add a new query to a timeline|
|[timeline_delete](timeline_delete)|<span class='vql_type'>Function</span>|Delete a super timeline|
|[timelines](timelines)|<span class='vql_type'>Plugin</span>|List all timelines in a notebook|
|[upload_directory](upload_directory)|<span class='vql_type'>Function</span>|Upload a file to an upload directory|
|[uploads](uploads)|<span class='vql_type'>Plugin</span>|Retrieve information about a flow's uploads|
|[user](user)|<span class='vql_type'>Function</span>|Retrieves information about the Velociraptor user|
|[user_create](user_create)|<span class='vql_type'>Function</span>|Creates a new user from the server, or updates their permissions or reset their password|
|[user_delete](user_delete)|<span class='vql_type'>Function</span>|Deletes a user from the server|
|[user_grant](user_grant)|<span class='vql_type'>Function</span>|Grants the user the specified roles|
|[user_options](user_options)|<span class='vql_type'>Function</span>|Update and read the user GUI options|
|[vfs_ls](vfs_ls)|<span class='vql_type'>Plugin</span>|List directory and build a VFS object|
|[whoami](whoami)|<span class='vql_type'>Function</span>|Returns the username that is running the query|
