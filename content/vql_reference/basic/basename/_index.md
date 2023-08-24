---
title: basename
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## basename
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|Any (required)
sep|Separator to use (default /)|string
path_type|Type of path (e.g. 'windows,linux)|string

### Description

Return the basename of the path.

### Example
```vql
basename(path="/foo/bar") -> "bar"
```

Related: `dirname()`


