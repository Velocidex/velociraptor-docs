---
title: data
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## data
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Makes a string appears as an in-memory file.

This accessor is useful to allow plugins that normally accept files to also
accept a plain string. VQL contains many plugins that work on files, for
example `parse_binary()`. It is handy to be able to use all the normal file
plugins with literal string data - this is what the `data` accessor is for.

When the `data` accessor is used, it creates an in-memory file with the
content of the file being the string that is passed as the filename.

`Path` is taken as a literal string to use as the file's data.


