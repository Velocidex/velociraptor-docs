---
title: rekey
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## rekey
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
wait|Wait this long before rekeying the client.|int64

Required Permissions: 
<i class="linkcolour label pull-right label-success">EXECVE</i>

### Description

Causes the client to rekey and regenerate a new client ID. DANGEROUS! This will change the client's identity and it will appear as a new client in the GUI.

