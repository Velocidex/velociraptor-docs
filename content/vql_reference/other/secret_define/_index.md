---
title: secret_define
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## secret_define
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
type|Type of the secret|string (required)
verifier|A VQL Lambda function to verify the secret|string
description|A description of the secret type|string
template|A Set of key/value pairs|ordereddict.Dict (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Define a new secret template

