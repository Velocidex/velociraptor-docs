---
title: Other
weight: 90
linkTitle: Other
sitemap:
  disable: true
no_edit: true
no_children: true
---

Functions and plugins that do not fall into a specific category or that have
not yet been categorized.
|Plugin/Function|Type|Description|
|-|-|-|
|[adx_upload](adx_upload)|Plugin|Upload rows to Azure Data Explorer (ADX)|
|[alert](alert)|Function|Generate an alert message|
|[all](all)|Function|Returns TRUE if all items are true|
|[any](any)|Function|Returns TRUE if any items are true|
|[array](array)|Function|Create an array|
|[atexit](atexit)|Function|Install a query to run when the query is unwound|
|[azure_monitor_upload](azure_monitor_upload)|Plugin|Upload rows to Azure Monitor / Log Analytics via the Logs Ingestion API (Data Collection Rule)|
|[background](background)|Function|Run a query in the background|
|[batch](batch)|Plugin|Batches query rows into multiple arrays|
|[cache](cache)|Function|Creates a cache object|
|[cache_dns](cache_dns)|Function|Add a DNS record to the cache|
|[cat](cat)|Plugin|Read files in chunks|
|[cidr_contains](cidr_contains)|Function|Calculates if an IP address falls within a range of CIDR specified|
|[collect](collect)|Plugin|Collect artifacts into a local file|
|[combine](combine)|Plugin|Combine the output of several queries into the same result set|
|[copy](copy)|Function|Copy a file|
|[dedup](dedup)|Plugin|Dedups the query based on a column|
|[delay](delay)|Plugin|Executes 'query' and delays relaying the rows by the specified number of seconds|
|[describe_address](describe_address)|Function|Describe an address in the PE text section|
|[dirname](dirname)|Function|Return the directory path|
|[efivariables](efivariables)|Plugin|Enumerate efi variables|
|[elastic_upload](elastic_upload)|Plugin|Upload rows to elastic|
|[enumerate](enumerate)|Function|Collect all the items in each group by bin|
|[environ](environ)|Function|Get an environment variable|
|[environ](environ)|Plugin|The row returned will have all environment variables as|
|[eval](eval)|Function|Evaluate a vql lambda function on the current scope|
|[favorites_list](favorites_list)|Plugin|List all user's favorites|
|[filesystems](filesystems)|Plugin|Enumerates mounted filesystems|
|[for](for)|Plugin|Iterate over a list|
|[gcs_pubsub_publish](gcs_pubsub_publish)|Function|Publish a message to Google PubSub|
|[generate](generate)|Function|Create a named generator that receives rows from the query|
|[geoip](geoip)|Function|Lookup an IP Address using the MaxMind GeoIP database|
|[getpid](getpid)|Function|Returns the current pid of the Velociraptor process|
|[help](help)|Plugin|Dump information about all VQL functions and plugins|
|[host](host)|Function|Perform a DNS resolution|
|[hunt_reindex](hunt_reindex)|Plugin|Reindex a hunt|
|[index](index)|Plugin|Create a local index from a query|
|[index_search](index_search)|Plugin|Search a previously created index|
|[info](info)|Function|Get information about the running host|
|[ip](ip)|Function|Format an IP address|
|[lazy_dict](lazy_dict)|Function|Construct a dict from arbitrary keyword args - does not materialize args so it is suitable for building args via `**` expansion|
|[logscale_upload](logscale_upload)|Plugin|Upload rows to LogScale ingestion server|
|[lru](lru)|Function|Creates an LRU object|
|[magic](magic)|Function|Identify a file using magic rules|
|[mail](mail)|Function|Send Email to a remote server|
|[max](max)|Function|Finds the largest item in the aggregate|
|[min](min)|Function|Finds the smallest item in the aggregate|
|[netcat](netcat)|Plugin|Make a tcp connection and read data from a socket|
|[notebooks](notebooks)|Plugin|List all notebooks|
|[parse_pst](parse_pst)|Plugin|Parse a PST file and extract email data|
|[patch](patch)|Function|Patch a JSON object with a json patch or merge|
|[path_join](path_join)|Function|Build a path by joining all components|
|[pe_dump](pe_dump)|Function|Dump a PE file from process memory|
|[pipe](pipe)|Function|A pipe allows plugins that use files to read data from a vql|
|[process_tracker](process_tracker)|Function|Install a global process tracker|
|[process_tracker_all](process_tracker_all)|Function|Get all processes stored in the tracker|
|[process_tracker_callchain](process_tracker_callchain)|Function|Get a call chain from the global process tracker|
|[process_tracker_children](process_tracker_children)|Function|Get all children of a process|
|[process_tracker_tree](process_tracker_tree)|Function|Get the full process tree under the process id|
|[process_tracker_updates](process_tracker_updates)|Plugin|Get the process tracker update events from the global process tracker|
|[pskill](pskill)|Function|Kill the specified process|
|[rand](rand)|Function|Selects a random number|
|[rate](rate)|Function|Calculates the rate (derivative) between two quantities|
|[read_crypto_file](read_crypto_file)|Plugin|Read a previously stored encrypted local storage file|
|[reformat](reformat)|Function|Reformat VQL|
|[rekey](rekey)|Function|Causes the client to rekey and regenerate a new client ID|
|[remap](remap)|Function|Apply a remapping configuration to the root scope|
|[rm](rm)|Function|Remove a file from the filesystem using the API|
|[rsyslog](rsyslog)|Function|Send an RFC5424 compliant remote syslog message|
|[sample](sample)|Plugin|Executes 'query' and samples every n'th row|
|[semver](semver)|Function|Parse a semantic version string|
|[serialize](serialize)|Function|Encode an object as a string|
|[shell_session](shell_session)|Function|Recreate or retrieve a shell session handle|
|[shell_session_control](shell_session_control)|Function|Control a previously created shell session|
|[sigma_log_sources](sigma_log_sources)|Function|Constructs a Log sources object to be used in sigma rules|
|[similarity](similarity)|Function|Compare two Dicts for similarity|
|[sleep](sleep)|Function|Sleep for the specified number of seconds|
|[slice](slice)|Function|Slice an array|
|[splunk_upload](splunk_upload)|Plugin|Upload rows to splunk|
|[sql](sql)|Plugin|Run queries against sqlite, mysql, and postgres databases|
|[stat](stat)|Plugin|Get file information|
|[strip](strip)|Function|Strip prefix and/or suffix from a string|
|[sum](sum)|Function|Sums the items|
|[template](template)|Function|Expand a Go style template |
|[timestamp_format](timestamp_format)|Function|Format a timestamp into a string|
|[typeof](typeof)|Function|Print the underlying Go type of the variable|
|[upcase](upcase)|Function|Returns an uppercase version of the string|
|[upload_azure](upload_azure)|Function|Upload files to Azure Blob Storage Service|
|[upload_gcs](upload_gcs)|Function|Upload files to GCS|
|[upload_s3](upload_s3)|Function|Upload files to S3|
|[upload_sftp](upload_sftp)|Function|Upload files to SFTP|
|[upload_smb](upload_smb)|Function|Upload files using the SMB file share protocol|
|[upload_transactions](upload_transactions)|Plugin|View the outstanding transactions for uploads|
|[upload_webdav](upload_webdav)|Function|Upload files to a WebDAV server|
|[url](url)|Function|Construct a URL or parse one|
|[user_message](user_message)|Function|Send the user a message which will appear in the user notification view|
|[user_messages](user_messages)|Plugin|Emit the user's console messages|
|[uuid](uuid)|Function|Generate a UUID|
|[verify](verify)|Function|verify an artifact|
|[version](version)|Function|Gets the version of a VQL plugin or function|
|[write_crypto_file](write_crypto_file)|Plugin|Write a query into an encrypted local storage file|
|[write_csv](write_csv)|Plugin|Write a query into a CSV file|
|[write_file](write_file)|Function|Writes a string onto a file|
|[write_jsonl](write_jsonl)|Plugin|Write a query into a JSONL file|
|[yarax](yarax)|Plugin|Scan files using yara rules (Using the new yarax engine)|
