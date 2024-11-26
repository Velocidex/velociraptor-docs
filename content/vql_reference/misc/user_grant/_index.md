---
title: user_grant
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## user_grant
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
user|The user to create or update.|string (required)
roles|List of roles to give the user.|list of string
orgs|One or more org IDs to grant access to. If not specified we use current org|list of string
policy|A dict of permissions to set (e.g. as obtained from the gui_users() function).|ordereddict.Dict

### Description

Grants the user the specified roles.

