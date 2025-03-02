---
title: hunt_delete
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## hunt_delete
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id||string (required)
really_do_it||bool
workers|Delete with this many workers (default 2)|int64
archive|Set this to only archive the hunt - it will still be accessible but will be hidden from the GUI|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Delete a hunt. 

