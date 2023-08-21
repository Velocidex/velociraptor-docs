---
title: read_file
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## read_file
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
chunk|length of each chunk to read from the file.|int
max_length|Max length of the file to read.|int
filenames|One or more files to open.|list of OSPath (required)
accessor|An accessor to use.|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Read files in chunks.

This plugin reads a file in chunks and returns each chunks as a separate row.

It is useful when we want to report file contents for small files like
configuration files etc.

The returned row contains the following columns: data, offset, filename


