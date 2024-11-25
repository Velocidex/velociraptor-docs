---
title: Misc
weight: 70
linktitle: Misc
index: true
no_edit: true
no_children: true
---

Miscellaneous plugins not yet categorized.
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[alert](alert)|<span class='vql_type'>Function</span>|Generate an alert message|
|[all](all)|<span class='vql_type'>Function</span>|Returns TRUE if all items are true|
|[any](any)|<span class='vql_type'>Function</span>|Returns TRUE if any items are true|
|[artifact_set_metadata](artifact_set_metadata)|<span class='vql_type'>Function</span>|Sets metadata about the artifact|
|[backup](backup)|<span class='vql_type'>Plugin</span>|Generates a backup file|
|[backup_restore](backup_restore)|<span class='vql_type'>Plugin</span>|Restore state from a backup file|
|[base85decode](base85decode)|<span class='vql_type'>Function</span>|Decode a base85 encoded string|
|[carve_usn](carve_usn)|<span class='vql_type'>Plugin</span>|Carve for the USN journal entries from a device|
|[client_create](client_create)|<span class='vql_type'>Function</span>|Create a new client in the data store|
|[create_notebook_download](create_notebook_download)|<span class='vql_type'>Function</span>|Creates a notebook export zip file|
|[delay](delay)|<span class='vql_type'>Plugin</span>|Executes 'query' and delays relaying the rows by the specified number of seconds|
|[delete_events](delete_events)|<span class='vql_type'>Plugin</span>|Delete all the files that make up a flow|
|[delete_flow](delete_flow)|<span class='vql_type'>Plugin</span>|Delete all the files that make up a flow|
|[ebpf_events](ebpf_events)|<span class='vql_type'>Plugin</span>|Dumps information about potential ebpf_events that can be used by the|
|[efivariables](efivariables)|<span class='vql_type'>Plugin</span>|Enumerate efi variables|
|[entropy](entropy)|<span class='vql_type'>Function</span>|Calculates shannon scale entropy of a string|
|[etw_sessions](etw_sessions)|<span class='vql_type'>Plugin</span>|Enumerates all active ETW sessions|
|[eval](eval)|<span class='vql_type'>Function</span>|Evaluate a vql lambda function on the current scope|
|[flow_logs](flow_logs)|<span class='vql_type'>Plugin</span>|Retrieve the query logs of a flow|
|[get_flow](get_flow)|<span class='vql_type'>Function</span>|Gets flow details|
|[gunzip](gunzip)|<span class='vql_type'>Function</span>|Uncompress a gzip-compressed block of data|
|[host](host)|<span class='vql_type'>Function</span>|Perform a DNS resolution|
|[hunt_delete](hunt_delete)|<span class='vql_type'>Plugin</span>|Delete a hunt|
|[hunt_info](hunt_info)|<span class='vql_type'>Function</span>|Retrieve the hunt information|
|[hunt_update](hunt_update)|<span class='vql_type'>Function</span>|Update a hunt|
|[import](import)|<span class='vql_type'>Function</span>|Imports an artifact into the current scope|
|[lazy_dict](lazy_dict)|<span class='vql_type'>Function</span>|Construct a dict from arbitrary keyword args - does not materialize args so it is suitable for building args via `**` expansion|
|[leveldb](leveldb)|<span class='vql_type'>Plugin</span>|Enumerate all items in a level db database|
|[link_to](link_to)|<span class='vql_type'>Function</span>|Create a url linking to a particular part in the Velociraptor GUI|
|[logging](logging)|<span class='vql_type'>Plugin</span>|Watch the logs emitted by the server|
|[logscale_upload](logscale_upload)|<span class='vql_type'>Plugin</span>|Upload rows to LogScale ingestion server|
|[lru](lru)|<span class='vql_type'>Function</span>|Creates an LRU object|
|[lzxpress_decompress](lzxpress_decompress)|<span class='vql_type'>Function</span>|Decompress an lzxpress blob|
|[mail](mail)|<span class='vql_type'>Function</span>|Send Email to a remote server|
|[mock_clear](mock_clear)|<span class='vql_type'>Function</span>|Resets all mocks|
|[mock_replay](mock_replay)|<span class='vql_type'>Function</span>|Replay recorded calls on a mock|
|[monitoring_logs](monitoring_logs)|<span class='vql_type'>Plugin</span>|Retrieve log messages from client event monitoring for the specified client id and artifact|
|[notebook_create](notebook_create)|<span class='vql_type'>Function</span>|Create a new notebook|
|[notebook_export](notebook_export)|<span class='vql_type'>Function</span>|Exports a notebook to a zip file or HTML|
|[notebook_get](notebook_get)|<span class='vql_type'>Function</span>|Get a notebook|
|[notebook_update](notebook_update)|<span class='vql_type'>Function</span>|Update a notebook metadata|
|[notebook_update_cell](notebook_update_cell)|<span class='vql_type'>Function</span>|Update a notebook cell|
|[org](org)|<span class='vql_type'>Function</span>|Return the details of the current org|
|[org_create](org_create)|<span class='vql_type'>Function</span>|Creates a new organization|
|[org_delete](org_delete)|<span class='vql_type'>Function</span>|Deletes an Org from the server|
|[orgs](orgs)|<span class='vql_type'>Plugin</span>|Retrieve the list of orgs on this server|
|[panic](panic)|<span class='vql_type'>Plugin</span>|Crash the program with a panic!|
|[parse_journald](parse_journald)|<span class='vql_type'>Plugin</span>|Parse a journald file|
|[passwd](passwd)|<span class='vql_type'>Function</span>|Updates the user's password|
|[pe_dump](pe_dump)|<span class='vql_type'>Function</span>|Dump a PE file from process memory|
|[pk_decrypt](pk_decrypt)|<span class='vql_type'>Function</span>|Decrypt files using pubkey encryption|
|[pk_encrypt](pk_encrypt)|<span class='vql_type'>Function</span>|Encrypt files using pubkey encryption|
|[process_tracker](process_tracker)|<span class='vql_type'>Function</span>|Install a global process tracker|
|[process_tracker_all](process_tracker_all)|<span class='vql_type'>Function</span>|Get all processes stored in the tracker|
|[process_tracker_callchain](process_tracker_callchain)|<span class='vql_type'>Function</span>|Get a call chain from the global process tracker|
|[process_tracker_children](process_tracker_children)|<span class='vql_type'>Function</span>|Get all children of a process|
|[process_tracker_get](process_tracker_get)|<span class='vql_type'>Function</span>|Get a single process from the global tracker|
|[process_tracker_pslist](process_tracker_pslist)|<span class='vql_type'>Plugin</span>|List all processes from the process tracker|
|[process_tracker_tree](process_tracker_tree)|<span class='vql_type'>Function</span>|Get the full process tree under the process id|
|[process_tracker_updates](process_tracker_updates)|<span class='vql_type'>Plugin</span>|Get the process tracker update events from the global process tracker|
|[profile_goroutines](profile_goroutines)|<span class='vql_type'>Plugin</span>|Enumerates all running goroutines|
|[profile_memory](profile_memory)|<span class='vql_type'>Plugin</span>|Enumerates all in use memory within the runtime|
|[pskill](pskill)|<span class='vql_type'>Function</span>|Kill the specified process|
|[query](query)|<span class='vql_type'>Plugin</span>|Evaluate a VQL query|
|[read_crypto_file](read_crypto_file)|<span class='vql_type'>Plugin</span>|Read a previously stored encrypted local storage file|
|[rekey](rekey)|<span class='vql_type'>Function</span>|Causes the client to rekey and regenerate a new client ID|
|[remap](remap)|<span class='vql_type'>Function</span>|Apply a remapping configuration to the root scope|
|[repack](repack)|<span class='vql_type'>Function</span>|Repack and upload a repacked binary or MSI to the server|
|[server_frontend_cert](server_frontend_cert)|<span class='vql_type'>Function</span>|Get Server Frontend Certificate|
|[sigma](sigma)|<span class='vql_type'>Plugin</span>|Evaluate sigma rules|
|[sigma_log_sources](sigma_log_sources)|<span class='vql_type'>Function</span>|Constructs a Log sources object to be used in sigma rules|
|[similarity](similarity)|<span class='vql_type'>Function</span>|Compare two Dicts for similarity|
|[stat](stat)|<span class='vql_type'>Function</span>|Get file information|
|[sysinfo](sysinfo)|<span class='vql_type'>Function</span>|Collect system information on Linux clients|
|[threads](threads)|<span class='vql_type'>Plugin</span>|Enumerate threads in a process|
|[timeline_delete](timeline_delete)|<span class='vql_type'>Function</span>|Delete a super timeline|
|[timelines](timelines)|<span class='vql_type'>Plugin</span>|List all timelines in a notebook|
|[timestamp_format](timestamp_format)|<span class='vql_type'>Function</span>|Format a timestamp into a string|
|[tlsh_hash](tlsh_hash)|<span class='vql_type'>Function</span>|Calculate the tlsh hash of a file|
|[trace](trace)|<span class='vql_type'>Function</span>|Upload a trace file|
|[typeof](typeof)|<span class='vql_type'>Function</span>|Print the underlying Go type of the variable|
|[upload_azure](upload_azure)|<span class='vql_type'>Function</span>|Upload files to Azure Blob Storage Service|
|[upload_smb](upload_smb)|<span class='vql_type'>Function</span>|Upload files using the SMB file share protocol|
|[user](user)|<span class='vql_type'>Function</span>|Retrieves information about the Velociraptor user|
|[user_grant](user_grant)|<span class='vql_type'>Function</span>|Grants the user the specified roles|
|[user_options](user_options)|<span class='vql_type'>Function</span>|Update and read the user GUI options|
|[vfs_ls](vfs_ls)|<span class='vql_type'>Plugin</span>|List directory and build a VFS object|
|[watch_ebpf](watch_ebpf)|<span class='vql_type'>Plugin</span>|Watch for events from eBPF|
|[watch_journald](watch_journald)|<span class='vql_type'>Plugin</span>|Watch a journald file and stream events from it|
|[watch_jsonl](watch_jsonl)|<span class='vql_type'>Plugin</span>|Watch a jsonl file and stream events from it|
|[winpmem](winpmem)|<span class='vql_type'>Function</span>|Uses the `winpmem` driver to take a memory image|
|[write_crypto_file](write_crypto_file)|<span class='vql_type'>Plugin</span>|Write a query into an encrypted local storage file|
|[write_jsonl](write_jsonl)|<span class='vql_type'>Plugin</span>|Write a query into a JSONL file|
|[xattr](xattr)|<span class='vql_type'>Function</span>|Query a file for the specified extended attribute|
|[yara](yara)|<span class='vql_type'>Plugin</span>|Scan files using yara rules|
|[yara_lint](yara_lint)|<span class='vql_type'>Function</span>|Clean a set of yara rules|
