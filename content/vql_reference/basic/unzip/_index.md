---
title: unzip
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## unzip
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|File to unzip.|OSPath (required)
accessor|The accessor to use|string
filename_filter|Only extract members matching this regex filter.|string
output_directory|Where to unzip to|string (required)
type|The type of file (default autodetected from file extension - zip or tgz or tar.gz).|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_WRITE</i>
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Unzips a file into a directory.

This plugin supports a number of compression formats:
1. Zip files
2. Tar gz files.

The type of the file will be detected by the file extension, or
else you can force a type using the `type` parameter (`tgz` or
`zip`).


