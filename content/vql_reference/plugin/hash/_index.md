---
title: hash
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## hash
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Path to open and hash.|OSPath (required)
accessor|The accessor to use|string
hashselect|The hash function to use (MD5,SHA1,SHA256)|list of string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Calculate the hash of a file.

This function calculates the MD5, SHA1 and SHA256 hashes of the file.


