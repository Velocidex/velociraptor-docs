---
title: secret_modify
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## secret_modify
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name of the secret|string (required)
type|Type of the secret|string (required)
delete|Delete the secret completely|bool
add_users|A list of users to add to the secret|list of string
remove_users|A list of users to remove from the secret|list of string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Modify the secret

