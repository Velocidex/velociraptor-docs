---
title: collect
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## collect
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifacts|A list of artifacts to collect.|list of string (required)
output|A path to write the output file on.|string
report|A path to write the report on.|string
args|Optional parameters.|Any
password|An optional password to encrypt the collection zip.|string
format|Output format (csv, jsonl).|string
artifact_definitions|Optional additional custom artifacts.|Any
template|The name of a template artifact (i.e. one which has report of type HTML).|string
level|Compression level between 0 (no compression) and 9.|int64
ops_per_sec|Rate limiting for collections.|int64
cpu_limit|Set query cpu_limit value|float64
iops_limit|Set query iops_limit value|float64

### Description

Collect artifacts into a local file.

This plugin is essentially the same as the `velociraptor artifacts
collect --output file.zip` command. It will collect the artifacts
into a zip file.


