---
title: process
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## process
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Access process memory like a file.

The Path is taken in the form `/<pid>`, i.e. the pid appears as
the top level path component.

The accessor does not support directories so it can not be used
with the `glob()` plugin. It is useful for any functions or
plugins that need to read from process memory.

Note that process memory is typically very sparse (on 64 bit
systems it covers the entire address space). Therefore,
Velociraptor will treat it as sparse - various plugins that
support sparse files (such as the `upload()` plugin or `yara()`
plugin) will automatically handle the unmapped regions.

You will therefore need other plugins like `vad()` to figure out
the exact process memory layout where there is data to read. It is
not an error to read from unmapped regions, but it will just
return nulls.


