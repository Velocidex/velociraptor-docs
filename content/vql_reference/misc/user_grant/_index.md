---
title: user_grant
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## user_grant
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
user|The user to create or update.|string (required)
roles|List of roles to give the user.|list of string (required)
orgs|One or more org IDs to grant access to.|list of string

### Description

Grants the user the specified roles.

