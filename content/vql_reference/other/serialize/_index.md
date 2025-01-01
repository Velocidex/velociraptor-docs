---
title: serialize
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## serialize
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item|The item to encode|Any (required)
format|Encoding format (csv,json,yaml,hex,base64)|string

### Description

Encode an object as a string.

Several serialization formats are supported. The default format, if format
is not specified, is "json".

### Notes

This function is often useful when you need to pass a data structure to an
artifact parameter when the parameter expects a specific format. For
example,
`SELECT * FROM
Artifact.Linux.Search.FileFinder(SearchFilesGlobTable=serialize(format="csv",item=tlist),...)`
will pass a list in CSV format to the artifact's `SearchFilesGlobTable` parameter.

### See also

- [str]({{< ref "/vql_reference/popular/str/" >}}): Returns the string
  representation of the provided data.


