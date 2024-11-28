---
title: create_notebook_download
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## create_notebook_download
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
notebook_id|Notebook ID to export.|string (required)
filename|The name of the export. If not set this will be named according to the notebook id and timestamp|string

Required Permissions: 
<span class="linkcolour label label-success">PREPARE_RESULTS</span>

### Description

Creates a notebook export zip file.

