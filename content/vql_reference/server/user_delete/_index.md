---
title: user_delete
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## user_delete
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
user|The user to delete.|string (required)
orgs|If set we only delete from these orgs, otherwise we delete from the current org.|list of string
really_do_it|If not specified, just show what user will be removed|bool

### Description

Deletes a user from the server.

