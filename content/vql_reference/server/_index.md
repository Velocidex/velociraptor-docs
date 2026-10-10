---
title: Server-only
weight: 40
linkTitle: Server
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Velociraptor provides complete control of the server within VQL queries. On
  the server the VQL engine contains the following plugins and functions
  which you can use to manage and automate the server via VQL queries. Such
  server-side VQL can be run via Server Artifacts, Notebooks, or the API.
---

Velociraptor provides complete control of the server within VQL queries. On
the server the VQL engine contains the following plugins and functions
which you can use to manage and automate the server via VQL queries. Such
server-side VQL can be run via Server Artifacts, Notebooks, or the API.

{{% notice warning %}}

Since these rely on the server datastore and server services they are not
available on clients!

{{% /notice %}}
|Plugin/Function|Type|Description|
|-|-|-|
|[add_client_monitoring](add_client_monitoring)|Function|Adds a new artifact to the client monitoring table|
|[add_server_monitoring](add_server_monitoring)|Function|Adds a new artifact to the server monitoring table|
|[artifact_definitions](artifact_definitions)|Plugin|Dump artifact definitions from the internal repository|
|[artifact_delete](artifact_delete)|Function|Deletes an artifact from the global repository|
|[artifact_set](artifact_set)|Function|Sets an artifact into the global repository|
|[artifact_set_metadata](artifact_set_metadata)|Function|Sets metadata about the artifact|
|[backup](backup)|Plugin|Generates a backup file|
|[backup_restore](backup_restore)|Plugin|Restore state from a backup file|
|[cancel_flow](cancel_flow)|Function|Cancels the flow|
|[client_create](client_create)|Function|Create a new client in the data store|
|[client_delete](client_delete)|Plugin|Delete all information related to a client from the filestore|
|[client_info](client_info)|Function|Returns client info (like the fqdn) for a specific client from the|
|[client_metadata](client_metadata)|Function|Returns client metadata from the datastore|
|[client_set_metadata](client_set_metadata)|Function|Sets client metadata|
|[clients](clients)|Plugin|Returns client info for one or more clients from the datastore|
|[collect_client](collect_client)|Function|Launch an artifact collection against a client|
|[create_flow_download](create_flow_download)|Function|Creates a download pack for the flow|
|[create_hunt_download](create_hunt_download)|Function|Creates a download pack for a hunt|
|[create_notebook_download](create_notebook_download)|Function|Creates a notebook export zip file|
|[deb_create](deb_create)|Plugin|Create a deployable Debian package for client or server|
|[delete_events](delete_events)|Plugin|Delete events from a flow|
|[delete_flow](delete_flow)|Plugin|Delete all the files that make up a flow|
|[enumerate_flow](enumerate_flow)|Plugin|Enumerate all the files that make up a flow|
|[favorites_delete](favorites_delete)|Function|Delete a favorite|
|[favorites_save](favorites_save)|Function|Save a collection into the favorites|
|[file_store](file_store)|Function|Resolves file store paths into full filesystem paths|
|[file_store_delete](file_store_delete)|Function|Delete file store paths|
|[flow_logs](flow_logs)|Plugin|Retrieve the query logs of a flow|
|[flow_results](flow_results)|Plugin|Retrieve the results of a flow|
|[flows](flows)|Plugin|Retrieve the flows launched on each client|
|[get_client_monitoring](get_client_monitoring)|Function|Retrieve the current client monitoring state|
|[get_flow](get_flow)|Function|Gets flow details|
|[get_server_monitoring](get_server_monitoring)|Function|Retrieve the current server monitoring state|
|[gui_users](gui_users)|Plugin|Retrieve the list of users on the server|
|[hunt](hunt)|Function|Create and launch a hunt|
|[hunt_add](hunt_add)|Function|Assign a client to a hunt|
|[hunt_delete](hunt_delete)|Plugin|Delete a hunt|
|[hunt_flows](hunt_flows)|Plugin|Retrieve the flows launched by a hunt|
|[hunt_info](hunt_info)|Function|Retrieve the hunt information|
|[hunt_results](hunt_results)|Plugin|Retrieve the results of a hunt|
|[hunt_update](hunt_update)|Function|Update a hunt|
|[hunts](hunts)|Plugin|Retrieve the list of hunts|
|[import](import)|Function|Imports an artifact into the current scope|
|[import_collection](import_collection)|Function|Imports a collection zip file |
|[inventory](inventory)|Plugin|Retrieve the tools inventory|
|[inventory_add](inventory_add)|Function|Add or reconfigure a tool into the inventory|
|[inventory_get](inventory_get)|Function|Get tool info from inventory service|
|[killkillkill](killkillkill)|Function|Sends a kill message to the client and forces a restart - this is very aggressive!|
|[label](label)|Function|Add the labels to the client|
|[link_to](link_to)|Function|Create a url linking to a particular part in the Velociraptor GUI|
|[logging](logging)|Plugin|Watch the logs emitted by the server|
|[mail](mail)|Plugin|Send Email to a remote server|
|[monitoring](monitoring)|Plugin|Extract monitoring log from a client|
|[monitoring_logs](monitoring_logs)|Plugin|Retrieve log messages from client event monitoring for the specified client id and artifact|
|[notebook_create](notebook_create)|Function|Create a new notebook|
|[notebook_delete](notebook_delete)|Plugin|Delete a notebook with all its cells|
|[notebook_export](notebook_export)|Function|Exports a notebook to a zip file or HTML|
|[notebook_get](notebook_get)|Function|Get a notebook|
|[notebook_update](notebook_update)|Function|Update a notebook metadata|
|[notebook_update_cell](notebook_update_cell)|Function|Update a notebook cell|
|[org](org)|Function|Return the details of the current org|
|[org_create](org_create)|Function|Creates a new organization|
|[org_delete](org_delete)|Function|Deletes an Org from the server|
|[orgs](orgs)|Plugin|Retrieve the list of orgs on this server|
|[parallelize](parallelize)|Plugin|Runs query on result batches in parallel|
|[passwd](passwd)|Function|Updates the user's password|
|[query](query)|Plugin|Evaluate a VQL query|
|[repack](repack)|Function|Repack and upload a repacked binary or MSI to the server|
|[rm_client_monitoring](rm_client_monitoring)|Function|Remove an artifact from the client monitoring table|
|[rm_server_monitoring](rm_server_monitoring)|Function|Remove an artifact from the server monitoring table|
|[rpm_create](rpm_create)|Plugin|Create a deployable RPM package for client or server|
|[secret_add](secret_add)|Function|Add a new secret|
|[secret_modify](secret_modify)|Function|Modify the secret|
|[secrets](secrets)|Plugin|Retrieve the list of secrets on the server|
|[send_event](send_event)|Function|Sends an event to a server event monitoring queue|
|[server_frontend_cert](server_frontend_cert)|Function|Get Server Frontend Certificate|
|[server_metadata](server_metadata)|Function|Returns server metadata from the datastore|
|[server_set_metadata](server_set_metadata)|Function|Sets server metadata|
|[set_client_monitoring](set_client_monitoring)|Function|Sets the current client monitoring state|
|[set_server_monitoring](set_server_monitoring)|Function|Sets the current server monitoring state|
|[source](source)|Plugin|Retrieve rows from an artifact's source|
|[timeline](timeline)|Plugin|Read a timeline|
|[timeline_add](timeline_add)|Function|Add a new query to a timeline|
|[timeline_delete](timeline_delete)|Function|Delete a super timeline|
|[timelines](timelines)|Plugin|List all timelines in a notebook|
|[upload_directory](upload_directory)|Function|Upload a file to an upload directory|
|[uploads](uploads)|Plugin|Retrieve information about a flow's uploads|
|[user](user)|Function|Retrieves information about the Velociraptor user|
|[user_create](user_create)|Function|Creates a new user from the server, or updates their permissions or reset their password|
|[user_delete](user_delete)|Function|Deletes a user from the server|
|[user_grant](user_grant)|Function|Grants the user the specified roles|
|[user_options](user_options)|Function|Update and read the user GUI options|
|[vfs_ls](vfs_ls)|Plugin|List directory and build a VFS object|
|[whoami](whoami)|Function|Returns the username that is running the query|
