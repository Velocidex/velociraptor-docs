---
title: create_flow_download
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## create_flow_download
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|Client ID to export.|string (required)
flow_id|The flow id to export.|string (required)
wait|If set we wait for the download to complete before returning.|bool
type|Type of download to create (e.g. 'report') default a full zip file.|string
template|Report template to use (defaults to Reporting.Default).|string
password|An optional password to encrypt the collection zip.|string

### Description

Creates a download pack for the flow.

This function initiates the download creation process for a
flow. It is equivalent to the GUI functionality allowing to
"Download Results" from the Flows Overview page.

Using the `wait` parameter you can wait for the download to
complete or just kick it off asynchronously.


