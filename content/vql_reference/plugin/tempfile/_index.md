---
title: tempfile
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## tempfile
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|Data to write in the tempfile.|list of string
extension|An extension to place in the tempfile.|string
permissions|Required permissions (e.g. 'x').|string
remove_last|If set we delay removal as much as possible.|bool

Required Permissions: 
<span class="linkcolour label label-success">FILESYSTEM_WRITE</span>

### Description

Create a temporary file and write some data into it.

The file will be automatically removed when the query completes.


