---
title: wmi_events
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## wmi_events
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|WMI query to run.|string (required)
namespace|WMI namespace|string (required)
wait|Wait this many seconds for events and then quit.|int64 (required)

Required Permissions: 
<i class="linkcolour label pull-right label-success">MACHINE_STATE</i>

### Description

Executes an evented WMI queries asynchronously.

This plugin sets up a [WMI event](https://docs.microsoft.com/en-us/windows/desktop/wmisdk/receiving-a-wmi-event) listener query.


