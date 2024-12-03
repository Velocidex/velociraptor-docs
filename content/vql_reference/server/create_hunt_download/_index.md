---
title: create_hunt_download
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## create_hunt_download
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id|Hunt ID to export.|string (required)
only_combined|If set we only export combined results.|bool
wait|If set we wait for the download to complete before returning.|bool
format|Format to export (csv,json) defaults to both.|string
base|Base filename to write to.|string
password|An optional password to encrypt the collection zip.|string
expand_sparse|If set we expand sparse files in the archive.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">PREPARE_RESULTS</span>

### Description

Creates a download pack for a hunt.

This function initiates the download creation process for a
hunt. It is equivalent to the GUI functionality allowing to
"Download Results" from the Hunts Overview page.

Using the `wait` parameter you can wait for the download to
complete or just kick it off asynchronously.


