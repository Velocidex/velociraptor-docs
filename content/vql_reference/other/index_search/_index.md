---
title: index_search
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Search a previously created index.
---



<div class="vql_item"></div>


## index_search
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|The file path to the index to open.|string (required)
search|A Bleve search query. See https://blevesearch.com/docs/Query-String-Query/|string (required)
fields|A list of fields to include from the index.|list of string
sort|The field to sort by (precede with - to sort in descending order).|list of string
start|Row number to start.|uint64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Search a previously created index.

