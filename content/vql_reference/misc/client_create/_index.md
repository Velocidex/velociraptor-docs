---
title: client_create
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## client_create
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
first_seen_at||time.Time
last_seen_at||time.Time
labels||list of string
os|What type of OS this is (default offline)|string
hostname|The hostname of the system|string
client_id|if set we use this client id otherwise we make a new one|string
mac_addresses||list of string

Required Permissions: 
<span class="linkcolour label label-success">SERVER_ADMIN</span>

### Description

Create a new client in the data store.

