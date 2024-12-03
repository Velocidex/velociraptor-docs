---
title: inventory_add
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## inventory_add
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
tool||string (required)
serve_locally||bool
url||string
hash||string
filename|The name of the file on the endpoint|string
version||string
file|An optional file to upload|OSPath
accessor|The accessor to use to read the file.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Add or reconfigure a tool into the inventory.

Note that if you provide a file to override the tool it must be
readable by the server (so the file must reside on the server or
be accessible over a network share).


