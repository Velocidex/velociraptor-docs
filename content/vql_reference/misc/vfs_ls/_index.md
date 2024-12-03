---
title: vfs_ls
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## vfs_ls
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|The directory to refresh.|OSPath
components|Alternatively a list of path components can be given.|list of string
accessor|An accessor to use.|string
depth|Depth of directory to list (default 0).|int64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

List directory and build a VFS object.

This plugin is probably only useful as part of the
System.VFS.ListDirectory artifact.


