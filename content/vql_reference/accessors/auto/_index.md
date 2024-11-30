---
title: auto
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## auto
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Access the file using the best accessor possible.

The `auto` accessor is the default accessor that is used when a VQL
query does not specify an `accessor` parameter.

On Windows it attempts to open the file using the `file` accessor and
if that fails (for example due to permission errors), the `auto`
accessor automatically tries the `ntfs` accessor to access the file
using raw level filesystem parsing.

The overall effect is that the Velociraptor is able to transparently
access files that are locked (for example registry hives) or are
protected by filter drivers (e.g. some endpoint security software). In
general you should use the `auto` accessor to open files on the local
filesystem in all cases since it will be much faster than using the
`ntfs` accessor for every file (most files are not actually locked).

On other operating systems, the `auto` accessor is an alias to the
`file` accessor.


