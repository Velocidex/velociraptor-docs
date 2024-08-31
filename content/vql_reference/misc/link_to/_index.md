---
title: link_to
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## link_to
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
type|The type of link. Currently one of collection, hunt, artifact, event|string
client_id||string
flow_id||string
tab|The tab to focus - can be overview, request, results, logs, notebook|string
text|If specified we emit a markdown style URL with a text|string
hunt_id|The hunt id to read.|string
artifact|The artifact to retrieve|string
org|If set the link accesses a different org. Otherwise we accesses the current org.|string

### Description

Create a url linking to a particular part in the Velociraptor GUI.

