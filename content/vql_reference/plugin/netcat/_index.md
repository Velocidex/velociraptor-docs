---
title: netcat
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## netcat
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
address|The address to connect to (can be a file in case of a unix domain socket)|string (required)
type|Can be tcp or unix (default TCP)|string
send|Data to send before reading|string
sep|The separator that will be used to split (default - line feed)|string
chunk_size|Read input with this chunk size (default 64kb)|int
retry|Seconds to wait before retry - default 0 - do not retry|int

Required Permissions: 
<span class="linkcolour label label-success">COLLECT_SERVER</span>

### Description

Make a tcp connection and read data from a socket.

