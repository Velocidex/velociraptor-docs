---
title: parse_pst
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_pst
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|The PST file to parse.|OSPath (required)
FolderPath|The folder path to save the attachments from emails.|string
accessor|The accessor to use|string
raw|If set we emit the raw message object for all objects|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Parse a PST file and extract email data.

