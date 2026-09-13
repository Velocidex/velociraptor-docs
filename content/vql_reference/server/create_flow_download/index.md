---
title: create_flow_download
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Creates a download pack for the flow.

  This function initiates the download creation process for a
  flow. It is equivalent to the GUI functionality allowing to
  "Download Results" from the Flows Overview page.

  Using the `wait` parameter you can wait for the download to
  complete or just kick it off asynchronously.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id|Client ID to export.|string (required)
flow_id|The flow id to export.|string (required)
wait|If set we wait for the download to complete before returning.|bool
type|Type of download to create (deprecated Ignored).|string
template|Report template to use (deprecated Ignored).|string
password|An optional password to encrypt the collection zip.|string
format|Format to export (csv,json,csv_only) defaults to both.|string
expand_sparse|If set we expand sparse files in the archive.|bool
name|If specified we call the file this name otherwise we generate name based on flow id.|string

**Required permissions:** `PREPARE_RESULTS`

### Description

Creates a download pack for the flow.

This function initiates the download creation process for a
flow. It is equivalent to the GUI functionality allowing to
"Download Results" from the Flows Overview page.

Using the `wait` parameter you can wait for the download to
complete or just kick it off asynchronously.


