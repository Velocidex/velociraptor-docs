---
title: parse_usn
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_usn
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
device|The device file to open.|OSPath (required)
accessor|The accessor to use.|string
start_offset|The starting offset of the first USN record to parse.|int64

### Description

Parse the USN journal from a device.

