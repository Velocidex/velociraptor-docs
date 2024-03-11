---
title: notebook_export
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## notebook_export
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
notebook_id|The id of the notebook to export|string (required)
filename|The name of the export. If not set this will be named according to the notebook id and timestamp|string
type|Set the type of the export (html or zip).|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">PREPARE_RESULTS</i>

### Description

Exports a notebook to a zip file or HTML.

