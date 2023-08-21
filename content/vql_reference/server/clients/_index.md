---
title: clients
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## clients
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
search|Client search string. Can have the following prefixes: 'label:', 'host:'|string
start|First client to fetch (0)'|uint64
count|Maximum number of clients to fetch (1000)'|uint64
client_id||string

Required Permissions: 
<i class="linkcolour label pull-right label-success">READ_RESULTS</i>

### Description

Retrieve the list of clients.

