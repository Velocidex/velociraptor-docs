---
title: pslist
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pslist
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|A pid to list. If this is provided we are able to operate much faster by only opening a single process.|int64

Required Permissions: 
<span class="linkcolour label label-success">MACHINE_STATE</span>

### Description

Enumerate running processes.

When specifying the pid this operation is much faster so if you are
interested in specific processes, the pid should be
specified. Otherwise, the plugin returns all processes one on each
row.


