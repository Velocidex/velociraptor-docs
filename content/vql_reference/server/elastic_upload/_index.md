---
title: elastic_upload
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## elastic_upload
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for rows to upload.|StoredQuery (required)
threads|How many threads to use.|int64
index|The name of the index to upload to. If not specified ensure a column is named '_index'.|string
type|The type of the index to upload to.|string (required)
chunk_size|The number of rows to send at the time.|int64
addresses|A list of Elasticsearch nodes to use.|list of string
username|Username for HTTP Basic Authentication.|string
password|Password for HTTP Basic Authentication.|string
cloud_id|Endpoint for the Elastic Service (https://elastic.co/cloud).|string
api_key|Base64-encoded token for authorization; if set, overrides username and password.|string
wait_time|Batch elastic upload this long (2 sec).|int64
pipeline|Pipeline for uploads|string
disable_ssl_security|Disable ssl certificate verifications.|bool
root_ca|As a better alternative to disable_ssl_security, allows root ca certs to be added here.|string

### Description

Upload rows to elastic.

This uses the Elastic bulk upload API to push arbitrary rows to
elastic. The query specified in `query` will be run and each row
it emits will be uploaded as a separate event to Elastic.

You can either specify the elastic index explicitly using the
`index` parameter or provide an `_index` column in the query
itself to send the row to a different index each time.


