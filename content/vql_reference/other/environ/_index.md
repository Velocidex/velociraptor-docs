---
title: environ
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## environ
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
var|Extract the var from the environment.|string (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Get an environment variable.




<div class="vql_item"></div>


## environ
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
vars|Extract these variables from the environment and return them one per row|list of string

### Description

The row returned will have all environment variables as
columns. If the var parameter is provided, only those variables
will be provided.


