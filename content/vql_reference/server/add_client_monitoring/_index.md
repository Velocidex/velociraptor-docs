---
title: add_client_monitoring
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## add_client_monitoring
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The name of the artifact to add|string (required)
parameters|A dict of artifact parameters|LazyExpr
label|Add the artifact to this label group (default all)|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_CLIENT</span>

### Description

Adds a new artifact to the client monitoring table.

