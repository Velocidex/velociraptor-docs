---
title: pathspec
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pathspec
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
DelegateAccessor|An accessor to use.|string
DelegatePath|A delegate to pass to the accessor.|string
Path|A path to open.|Any
parse|Alternatively parse the pathspec from this string.|string
path_type|Type of path this is (windows,linux,registry,ntfs).|string

### Description

Create a structured path spec to pass to certain accessors.

