---
title: olevba
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## olevba
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|A list of filenames to open as OLE files.|list of OSPath (required)
accessor|The accessor to use.|string
max_size|Maximum size of file we load into memory.|int64

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Extracts VBA Macros from Office documents.

This plugin parses the provided files as OLE documents in order to
recover VB macro code. A single document can have multiple code
objects, and each such code object is emitted as a row.


