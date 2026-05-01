---
title: adx_upload
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Upload rows to Azure Data Explorer (ADX).
---



<div class="vql_item"></div>


## adx_upload
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for rows to upload.|StoredQuery (required)
threads|How many threads to use.|int64
cluster_url|The ADX cluster URL.|string
database|The ADX database name.|string
table|The name of the table to upload to.|string
client_id|Azure Service Principal Client ID.|string
client_secret|Azure Service Principal Client Secret.|string
tenant_id|Azure Service Principal Tenant ID.|string
chunk_size|The number of rows to send at the time.|int64
wait_time|Batch ADX upload this long (5 sec).|int64
max_memory_buffer|How large we allow the memory buffer to grow to while we are trying to contact the ADX server (default 100mb).|uint64
secret|Alternatively use a secret from the secrets service. Secret must be of type 'ADX Creds'|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">NETWORK</span>

### Description

Upload rows to Azure Data Explorer (ADX).

