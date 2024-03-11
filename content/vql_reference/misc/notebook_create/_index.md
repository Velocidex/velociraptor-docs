---
title: notebook_create
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## notebook_create
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|The name of the notebook|string
description|The description of the notebook|string
collaborators|A list of users to share the notebook with.|list of string
public|If set the notebook will be public.|bool
artifacts|A list of NOTEBOOK artifacts to create the notebook with (Notebooks.Default)|list of string
env|An environment to initialize the notebook with|ordereddict.Dict

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_SERVER</i>

### Description

Create a new notebook.

