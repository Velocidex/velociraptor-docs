---
title: regex_replace
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## regex_replace
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
source|The source string to replace.|string (required)
replace|The substitute string.|string
replace_lambda|Optionally the replacement can be a lambda.|string
re|A regex to apply|string (required)

### Description

Search and replace a string with a regexp. Note you can use $1 to replace the capture string.

