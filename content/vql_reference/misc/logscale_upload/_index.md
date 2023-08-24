---
title: logscale_upload
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## logscale_upload
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for rows to upload.|StoredQuery (required)
apibaseurl|Base URL for Ingestion API|string (required)
ingest_token|Ingest token for API|string (required)
threads|How many threads to use to post batched events.|int
http_timeout|Timeout for http requests (default: 10s)|int
max_retries|Maximum number of retries before failing an operation. A value < 0 means retry forever. (default: 7200)|int
root_ca|As a better alternative to skip_verify, allows root ca certs to be added here.|string
skip_verify|Skip verification of server certificates (default: false)|bool
batching_timeout_ms|Timeout between posts (default: 3000ms)|int
event_batch_size|Items to batch before post (default: 2000)|int
tag_fields|Name of fields to be used as tags. Fields can be renamed using =<newname>|list of string
stats_interval|Interval, in seconds, to post statistics to the log (default: 600, 0 to disable)|int
debug|Enable verbose logging.|bool

### Description

Upload rows to LogScale ingestion server.

