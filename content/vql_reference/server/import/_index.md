---
title: import
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## import
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The Artifact to import|string (required)

### Description

Imports an artifact into the current scope.

Importing an artifact loads the artifact's `export` section into
the current scope.

This only works in notebooks! In an artifact definition this
statement is not needed, since you can always add the dependent
artifact to the `imports` section.


