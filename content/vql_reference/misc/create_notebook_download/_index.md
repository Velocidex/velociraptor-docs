---
title: create_notebook_download
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## create_notebook_download
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
notebook_id|Notebook ID to export.|string (required)
filename|The name of the export. If not set this will be named according to the notebook id and timestamp|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">PREPARE_RESULTS</i>

### Description

Creates a notebook export zip file.

