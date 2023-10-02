---
title: Client Side
weight: 50
linktitle: Client
index: true
no_edit: true
no_children: true
---

This page lists the plugins used to collect information from
clients.

VQL plugins are the data sources of VQL queries. While SQL queries
refer to static tables of data, VQL queries refer to plugins, which
generate data rows to be filtered by the query.

Unlike SQL, VQL plugins also receive keyword arguments. When the
plugin is evaluated it simply generates a sequence of rows which are
further filtered by the query.

This allows VQL statements to be chained naturally since plugin args
may also be other queries.

{{% notice note %}}

VQL plugins are not the same as VQL functions. A plugin is the subject
of the VQL query - i.e. plugins always follow the `FROM` keyword,
while functions (which return a single value instead of a sequence of
rows) are only present in column specification (e.g. after `SELECT`)
or in condition clauses (i.e. after the `WHERE` keyword).

{{% /notice %}}
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[chain](chain)|<span class='vql_type'>Plugin</span>|Chain the output of several queries into the same table|
|[collect](collect)|<span class='vql_type'>Plugin</span>|Collect artifacts into a local file|
|[commandline_split](commandline_split)|<span class='vql_type'>Function</span>|Split a commandline into separate components following the windows|
|[connections](connections)|<span class='vql_type'>Plugin</span>|List all active connections|
|[crypto_rc4](crypto_rc4)|<span class='vql_type'>Function</span>|Apply rc4 to the string and key|
|[environ](environ)|<span class='vql_type'>Plugin</span>|The row returned will have all environment variables as|
|[execve](execve)|<span class='vql_type'>Plugin</span>|This plugin launches an external command and captures its STDERR,|
|[filesystems](filesystems)|<span class='vql_type'>Plugin</span>|Enumerates mounted filesystems|
|[flatten](flatten)|<span class='vql_type'>Plugin</span>|Flatten the columns in query|
|[for](for)|<span class='vql_type'>Plugin</span>|Iterate over a list|
|[foreach](foreach)|<span class='vql_type'>Plugin</span>|Executes 'query' once for each row in the 'row' query|
|[glob](glob)|<span class='vql_type'>Plugin</span>|Retrieve files based on a list of glob expressions|
|[grep](grep)|<span class='vql_type'>Function</span>|Search a file for keywords|
|[hash](hash)|<span class='vql_type'>Function</span>|Calculate the hash of a file|
|[http_client](http_client)|<span class='vql_type'>Plugin</span>|Make a http request|
|[if](if)|<span class='vql_type'>Plugin</span>|Conditional execution of query|
|[info](info)|<span class='vql_type'>Plugin</span>|Get information about the running host|
|[int](int)|<span class='vql_type'>Function</span>|Truncate to an integer|
|[ip](ip)|<span class='vql_type'>Function</span>|Format an IP address|
|[js_get](js_get)|<span class='vql_type'>Function</span>|Get a variable's value from the JS VM|
|[js_set](js_set)|<span class='vql_type'>Function</span>|Set a variables value in the JS VM|
|[magic](magic)|<span class='vql_type'>Function</span>|Identify a file using magic rules|
|[netcat](netcat)|<span class='vql_type'>Plugin</span>|Make a tcp connection and read data from a socket|
|[pathspec](pathspec)|<span class='vql_type'>Function</span>|Create a structured path spec to pass to certain accessors|
|[pipe](pipe)|<span class='vql_type'>Function</span>|A pipe allows plugins that use files to read data from a vql|
|[profile](profile)|<span class='vql_type'>Plugin</span>|Returns a profile dump from the running process|
|[pslist](pslist)|<span class='vql_type'>Plugin</span>|Enumerate running processes|
|[read_file](read_file)|<span class='vql_type'>Plugin</span>|Read files in chunks|
|[reg_rm_key](reg_rm_key)|<span class='vql_type'>Function</span>|Removes a key and all its values from the registry|
|[reg_rm_value](reg_rm_value)|<span class='vql_type'>Function</span>|Removes a value in the registry|
|[reg_set_value](reg_set_value)|<span class='vql_type'>Function</span>|Set a value in the registry|
|[rm](rm)|<span class='vql_type'>Function</span>|Remove a file from the filesystem using the API|
|[scope](scope)|<span class='vql_type'>Plugin</span>|The scope plugin returns the current scope as a single row|
|[sql](sql)|<span class='vql_type'>Plugin</span>|Run queries against sqlite, mysql, and postgres databases|
|[stat](stat)|<span class='vql_type'>Plugin</span>|Get file information|
|[switch](switch)|<span class='vql_type'>Plugin</span>|Conditional execution of multiple queries in order|
|[tempfile](tempfile)|<span class='vql_type'>Function</span>|Create a temporary file and write some data into it|
|[upload](upload)|<span class='vql_type'>Function</span>|Upload a file to the upload service|
|[upload](upload)|<span class='vql_type'>Plugin</span>|Upload files to the server|
|[upload_gcs](upload_gcs)|<span class='vql_type'>Function</span>|Upload files to GCS|
|[upload_s3](upload_s3)|<span class='vql_type'>Function</span>|Upload files to S3|
|[whoami](whoami)|<span class='vql_type'>Function</span>|Returns the username that is running the query|
|[write_csv](write_csv)|<span class='vql_type'>Plugin</span>|Write a query into a CSV file|
|[yara](yara)|<span class='vql_type'>Plugin</span>|Scan files using yara rules|
