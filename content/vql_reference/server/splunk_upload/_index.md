---
title: splunk_upload
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## splunk_upload
<span class='vql_type pull-right page-header'>Plugin</span>



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
root_ca|As a better alternative to skip_verify, allows root ca certs to be added here.|string
wait_time|Batch splunk upload this long (2 sec).|int64
hostname|Hostname for Splunk Events. Defaults to server hostname.|string
timestamp_field|Field to use as event timestamp.|string
hostname_field|Field to use as event hostname. Overrides hostname parameter.|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_SERVER</i>

### Description

Upload rows to splunk.

