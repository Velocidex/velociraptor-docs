---
title: add_client_monitoring
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## add_client_monitoring
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The name of the artifact to add|string (required)
parameters|A dict of artifact parameters|LazyExpr
label|Add this artifact to this label group (default all)|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_CLIENT</i>

### Description

Adds a new artifact to the client monitoring table.

