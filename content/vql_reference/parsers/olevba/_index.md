---
title: olevba
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## olevba
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|A list of filenames to open as OLE files.|list of OSPath (required)
accessor|The accessor to use.|string
max_size|Maximum size of file we load into memory.|int64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Extracts VBA Macros from Office documents.

This plugin parses the provided files as OLE documents in order to
recover VB macro code. A single document can have multiple code
objects, and each such code object is emitted as a row.


