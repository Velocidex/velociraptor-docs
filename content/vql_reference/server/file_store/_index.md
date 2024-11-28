---
title: file_store
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## file_store
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|A VFS path to convert|LazyExpr (required)

### Description

Resolves file store paths into full filesystem paths.

This function is only available on the server. It can be used to
find the backing file behind a filestore path so it can be passed
on to an external program.

Velociraptor uses the concept of a Virtual File System to manage the
information about clients etc. The VFS path is a path into the file
store. Of course ultimately (at least in the current implementation)
the file store is storing files on disk, but the disk filename is not
necessarily the same as the VFS path (for example non-representable
characters are escaped).

You can use the `file_store()` function to return the real file path
on disk. This probably only makes sense for VQL queries running on the
server which can independently open the file.

In future the file store may be abstracted (e.g. files may not be
locally stored at all) and this function may stop working.


