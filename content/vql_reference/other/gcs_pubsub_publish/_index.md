---
title: gcs_pubsub_publish
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## gcs_pubsub_publish
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
topic|The topic to publish to|string (required)
project_id|The project id to publish to|string (required)
msg|Message to publish to Pubsub|Any (required)
credentials|The credentials to use|string (required)
attributes|The publish attributes|ordereddict.Dict (required)

### Description

Publish a message to Google PubSub.

