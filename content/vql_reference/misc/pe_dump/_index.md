---
title: pe_dump
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pe_dump
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|The pid to dump.|uint64 (required)
base_offset|The offset in the file for the base address.|int64 (required)
in_memory|By default we store to a tempfile and return the path. If this option is larger than 0, we prepare the file in a memory buffer at the specified limit, to avoid AV alerts on disk access.|uint64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Dump a PE file from process memory.

