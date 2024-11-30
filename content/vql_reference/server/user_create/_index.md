---
title: user_create
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## user_create
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
user|The user to create or update.|string (required)
roles|List of roles to give the user.|list of string (required)
password|A password to set for the user (If not using SSO this might be needed).|string
orgs|One or more org IDs to grant access to. If empty we use the current org.|list of string

### Description

Creates a new user from the server, or updates their permissions or reset their password.

