---
title: gunzip
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## gunzip
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|Data to apply Gunzip|string (required)

### Description

Uncompress a gzip-compressed block of data.

### Example

```vql
gunzip(string=base64decode(string="H4sIAAAAAAACA3N0pC4AAKAb0QxQAAAA")) -> "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
```


