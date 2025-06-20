---
title: dirname
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## dirname
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|Any (required)
sep|Separator to use (default /)|string
path_type|Type of path (e.g. windows, linux)|string

### Description

Return the directory path.

### Example

```vql
dirname(path="/usr/bin/ls") -> "/usr/bin"
```

### See also

- [basename]({{< ref "/vql_reference/popular/basename/" >}})


