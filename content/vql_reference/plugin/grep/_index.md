---
title: grep
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## grep
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|path to open.|string (required)
accessor|An accessor to use.|string
keywords|Keywords to search for.|list of string (required)
context|Extract this many bytes as context around hits.|int

### Description

Search a file for keywords.

DEPRECATED: Use `yara()` instead.


