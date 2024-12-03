---
title: collect
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## collect
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifacts|A list of artifacts to collect.|list of string (required)
output|A path to write the output file on.|string
report|A path to write the report on (deprecated and ignored).|string
args|Optional parameters.|Any
password|An optional password to encrypt the collection zip.|string
format|Output format (csv, jsonl, csv_only).|string
artifact_definitions|Optional additional custom artifacts.|Any
template|(Deprecated Ignored).|string
level|Compression level between 0 (no compression) and 9.|int64
ops_per_sec|Rate limiting for collections (deprecated).|int64
cpu_limit|Set query cpu_limit value|float64
iops_limit|Set query iops_limit value|float64
progress_timeout|If no progress is detected in this many seconds, we terminate the query and output debugging information|float64
timeout|Total amount of time in seconds, this collection will take. Collection is cancelled when timeout is exceeded.|float64
metadata|Metadata to store in the zip archive. Outputs to metadata.json in top level of zip file.|StoredQuery
concurrency|Number of concurrent collections.|int64
remapping|A Valid remapping configuration in YAML or JSON format.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_WRITE</span>

### Description

Collect artifacts into a local file.

This plugin is essentially the same as the `velociraptor artifacts
collect --output file.zip` command. It will collect the artifacts
into a zip file.


