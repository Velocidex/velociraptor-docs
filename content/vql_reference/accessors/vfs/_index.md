---
title: vfs
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## vfs
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access client's VFS filesystem on the server.

On the Velociraptor server, the Virtual File System (VFS)
represents a cached copy of the files and directories we have
collected from the client using the `VFS` GUI.

Since it is a snapshot formed over multiple collections from the
GUI it may change in future (for example if a file is added or
removed, the next time the directory is refreshed the VFS view
will change).

Due to the interactive nature of the VFS collections, the VFS is
constructed over many collections in different times.

Sometimes we want to directly read those cached files and
directories and this is where the `vfs` accessor comes in.

The accessor gets the client's ID from the `ClientId` scope
variable. The first component of the path is taken to be the
accessor (top level of the VFS GUI).

This accessor is mostly used in the `System.VFS.Export` artifact
to facilitate snapshotting of the VFS view in the GUI.


