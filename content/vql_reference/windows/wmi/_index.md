---
title: wmi
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## wmi
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|The WMI query to issue.|string (required)
namespace|The WMI namespace to use (ROOT/CIMV2)|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Execute simple WMI queries synchronously.

This plugin issues a WMI query and returns its rows directly. The
exact format of the returned row depends on the WMI query issued.

This plugin creates a bridge between WMI and VQL and it is a very
commonly used plugin for inspecting the state of windows systems.


