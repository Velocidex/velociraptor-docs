---
title: rekey
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## rekey
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
wait|Wait this long before rekeying the client.|int64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">EXECVE</span>

### Description

Causes the client to rekey and regenerate a new client ID. DANGEROUS! This will change the client's identity and it will appear as a new client in the GUI.

