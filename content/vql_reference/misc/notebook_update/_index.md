---
title: notebook_update
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## notebook_update
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
notebook_id|The id of the notebook to update|string (required)
description|The description of the notebook|string
collaborators|A list of users to share the notebook with.|list of string
public|If set the notebook will be public.|bool
attachment|Raw data of an attachment to be added to the notebook|string
attachment_filename|The name of the attachment|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_SERVER</i>

### Description

Update a notebook metadata.

