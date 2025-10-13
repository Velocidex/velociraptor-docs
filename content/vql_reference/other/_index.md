---
title: Other
weight: 90
linktitle: Other
index: true
no_edit: true
no_children: true
---

Functions and plugins that do not fall into a specific category or that have
not yet been categorized.
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[alert](alert)|<span class='vql_type'>Function</span>|Generate an alert message|
|[all](all)|<span class='vql_type'>Function</span>|Returns TRUE if all items are true|
|[any](any)|<span class='vql_type'>Function</span>|Returns TRUE if any items are true|
|[array](array)|<span class='vql_type'>Function</span>|Create an array|
|[atexit](atexit)|<span class='vql_type'>Function</span>|Install a query to run when the query is unwound|
|[background](background)|<span class='vql_type'>Function</span>|Run a query in the background|
|[batch](batch)|<span class='vql_type'>Plugin</span>|Batches query rows into multiple arrays|
|[cache](cache)|<span class='vql_type'>Function</span>|Creates a cache object|
|[cache_dns](cache_dns)|<span class='vql_type'>Function</span>|Add a DNS record to the cache|
|[cat](cat)|<span class='vql_type'>Plugin</span>|Read files in chunks|
|[cidr_contains](cidr_contains)|<span class='vql_type'>Function</span>|Calculates if an IP address falls within a range of CIDR specified|
|[collect](collect)|<span class='vql_type'>Plugin</span>|Collect artifacts into a local file|
|[combine](combine)|<span class='vql_type'>Plugin</span>|Combine the output of several queries into the same result set|
|[copy](copy)|<span class='vql_type'>Function</span>|Copy a file|
|[dedup](dedup)|<span class='vql_type'>Plugin</span>|Dedups the query based on a column|
|[delay](delay)|<span class='vql_type'>Plugin</span>|Executes 'query' and delays relaying the rows by the specified number of seconds|
|[dirname](dirname)|<span class='vql_type'>Function</span>|Return the directory path|
|[efivariables](efivariables)|<span class='vql_type'>Plugin</span>|Enumerate efi variables|
|[elastic_upload](elastic_upload)|<span class='vql_type'>Plugin</span>|Upload rows to elastic|
|[enumerate](enumerate)|<span class='vql_type'>Function</span>|Collect all the items in each group by bin|
|[environ](environ)|<span class='vql_type'>Function</span>|Get an environment variable|
|[environ](environ)|<span class='vql_type'>Plugin</span>|The row returned will have all environment variables as|
|[eval](eval)|<span class='vql_type'>Function</span>|Evaluate a vql lambda function on the current scope|
|[favorites_list](favorites_list)|<span class='vql_type'>Plugin</span>|List all user's favorites|
|[filesystems](filesystems)|<span class='vql_type'>Plugin</span>|Enumerates mounted filesystems|
|[for](for)|<span class='vql_type'>Plugin</span>|Iterate over a list|
|[gcs_pubsub_publish](gcs_pubsub_publish)|<span class='vql_type'>Function</span>|Publish a message to Google PubSub|
|[generate](generate)|<span class='vql_type'>Function</span>|Create a named generator that receives rows from the query|
|[geoip](geoip)|<span class='vql_type'>Function</span>|Lookup an IP Address using the MaxMind GeoIP database|
|[getpid](getpid)|<span class='vql_type'>Function</span>|Returns the current pid of the Velociraptor process|
|[help](help)|<span class='vql_type'>Plugin</span>|Dump information about all VQL functions and plugins|
|[host](host)|<span class='vql_type'>Function</span>|Perform a DNS resolution|
|[ip](ip)|<span class='vql_type'>Function</span>|Format an IP address|
|[lazy_dict](lazy_dict)|<span class='vql_type'>Function</span>|Construct a dict from arbitrary keyword args - does not materialize args so it is suitable for building args via `**` expansion|
|[logscale_upload](logscale_upload)|<span class='vql_type'>Plugin</span>|Upload rows to LogScale ingestion server|
|[lru](lru)|<span class='vql_type'>Function</span>|Creates an LRU object|
|[magic](magic)|<span class='vql_type'>Function</span>|Identify a file using magic rules|
|[mail](mail)|<span class='vql_type'>Function</span>|Send Email to a remote server|
|[max](max)|<span class='vql_type'>Function</span>|Finds the largest item in the aggregate|
|[min](min)|<span class='vql_type'>Function</span>|Finds the smallest item in the aggregate|
|[netcat](netcat)|<span class='vql_type'>Plugin</span>|Make a tcp connection and read data from a socket|
|[notebooks](notebooks)|<span class='vql_type'>Plugin</span>|List all notebooks|
|[parse_pst](parse_pst)|<span class='vql_type'>Plugin</span>|Parse a PST file and extract email data|
|[patch](patch)|<span class='vql_type'>Function</span>|Patch a JSON object with a json patch or merge|
|[path_join](path_join)|<span class='vql_type'>Function</span>|Build a path by joining all components|
|[pe_dump](pe_dump)|<span class='vql_type'>Function</span>|Dump a PE file from process memory|
|[pipe](pipe)|<span class='vql_type'>Function</span>|A pipe allows plugins that use files to read data from a vql|
|[process_tracker](process_tracker)|<span class='vql_type'>Function</span>|Install a global process tracker|
|[process_tracker_all](process_tracker_all)|<span class='vql_type'>Function</span>|Get all processes stored in the tracker|
|[process_tracker_callchain](process_tracker_callchain)|<span class='vql_type'>Function</span>|Get a call chain from the global process tracker|
|[process_tracker_children](process_tracker_children)|<span class='vql_type'>Function</span>|Get all children of a process|
|[process_tracker_tree](process_tracker_tree)|<span class='vql_type'>Function</span>|Get the full process tree under the process id|
|[process_tracker_updates](process_tracker_updates)|<span class='vql_type'>Plugin</span>|Get the process tracker update events from the global process tracker|
|[pskill](pskill)|<span class='vql_type'>Function</span>|Kill the specified process|
|[rand](rand)|<span class='vql_type'>Function</span>|Selects a random number|
|[rate](rate)|<span class='vql_type'>Function</span>|Calculates the rate (derivative) between two quantities|
|[read_crypto_file](read_crypto_file)|<span class='vql_type'>Plugin</span>|Read a previously stored encrypted local storage file|
|[rekey](rekey)|<span class='vql_type'>Function</span>|Causes the client to rekey and regenerate a new client ID|
|[remap](remap)|<span class='vql_type'>Function</span>|Apply a remapping configuration to the root scope|
|[rm](rm)|<span class='vql_type'>Function</span>|Remove a file from the filesystem using the API|
|[rsyslog](rsyslog)|<span class='vql_type'>Function</span>|Send an RFC5424 compliant remote syslog message|
|[sample](sample)|<span class='vql_type'>Plugin</span>|Executes 'query' and samples every n'th row|
|[serialize](serialize)|<span class='vql_type'>Function</span>|Encode an object as a string|
|[sigma_log_sources](sigma_log_sources)|<span class='vql_type'>Function</span>|Constructs a Log sources object to be used in sigma rules|
|[similarity](similarity)|<span class='vql_type'>Function</span>|Compare two Dicts for similarity|
|[sleep](sleep)|<span class='vql_type'>Function</span>|Sleep for the specified number of seconds|
|[slice](slice)|<span class='vql_type'>Function</span>|Slice an array|
|[splunk_upload](splunk_upload)|<span class='vql_type'>Plugin</span>|Upload rows to splunk|
|[sql](sql)|<span class='vql_type'>Plugin</span>|Run queries against sqlite, mysql, and postgres databases|
|[stat](stat)|<span class='vql_type'>Plugin</span>|Get file information|
|[strip](strip)|<span class='vql_type'>Function</span>|Strip prefix and/or suffix from a string|
|[sum](sum)|<span class='vql_type'>Function</span>|Sums the items|
|[template](template)|<span class='vql_type'>Function</span>|Expand a Go style template |
|[timestamp_format](timestamp_format)|<span class='vql_type'>Function</span>|Format a timestamp into a string|
|[typeof](typeof)|<span class='vql_type'>Function</span>|Print the underlying Go type of the variable|
|[upcase](upcase)|<span class='vql_type'>Function</span>|Returns an uppercase version of the string|
|[upload_azure](upload_azure)|<span class='vql_type'>Function</span>|Upload files to Azure Blob Storage Service|
|[upload_gcs](upload_gcs)|<span class='vql_type'>Function</span>|Upload files to GCS|
|[upload_s3](upload_s3)|<span class='vql_type'>Function</span>|Upload files to S3|
|[upload_sftp](upload_sftp)|<span class='vql_type'>Function</span>|Upload files to SFTP|
|[upload_smb](upload_smb)|<span class='vql_type'>Function</span>|Upload files using the SMB file share protocol|
|[upload_transactions](upload_transactions)|<span class='vql_type'>Plugin</span>|View the outstanding transactions for uploads|
|[upload_webdav](upload_webdav)|<span class='vql_type'>Function</span>|Upload files to a WebDAV server|
|[url](url)|<span class='vql_type'>Function</span>|Construct a URL or parse one|
|[uuid](uuid)|<span class='vql_type'>Function</span>|Generate a UUID|
|[verify](verify)|<span class='vql_type'>Function</span>|verify an artifact|
|[version](version)|<span class='vql_type'>Function</span>|Gets the version of a VQL plugin or function|
|[write_crypto_file](write_crypto_file)|<span class='vql_type'>Plugin</span>|Write a query into an encrypted local storage file|
|[write_csv](write_csv)|<span class='vql_type'>Plugin</span>|Write a query into a CSV file|
|[write_jsonl](write_jsonl)|<span class='vql_type'>Plugin</span>|Write a query into a JSONL file|
