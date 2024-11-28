---
title: artifact_set_metadata
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## artifact_set_metadata
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|The Artifact to update|string (required)
hidden|Set to true make the artifact hidden in the GUI, false to make it visible again.|bool
basic|Set to true make the artifact a 'basic' artifact. This allows users with the COLLECT_BASIC permission able to collect it.|bool

Required Permissions: 
<span class="linkcolour label label-success">ARTIFACT_WRITER</span>
<span class="linkcolour label label-success">SERVER_ARTIFACT_WRITER</span>

### Description

Sets metadata about the artifact.

This VQL function is used to clean up the artifact search screen
and guide users to assist with investigations.

Velociraptor comes with a lot of built in artifacts which may be
confusing to some users and in specialized deployments it may be
preferable to guide users into a small subset of artifacts and
hide the rest.

For example, say you have a set of custom artifacts that you only
want to show. Then I would add a special keyword to their
description (for example a company name - say "Written by ACME
inc"). Then a query like this will hide the others:

```vql
SELECT name, artifact_set_metadata(name=name, hidden=TRUE)
FROM artifact_definitions() WHERE NOT description =~ "ACME"
```


