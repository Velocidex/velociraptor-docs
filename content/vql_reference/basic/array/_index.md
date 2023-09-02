---
title: array
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## array
<span class='vql_type pull-right page-header'>Function</span>


### Description

Create an array with all the args.

This function accepts arbitrary arguments and creates an array by
flattening the arguments.

### Examples

```vql
array(a=1, b=2) -> [1, 2]
```

You can use this to flatten a subquery as well:

```vql
SELECT array(a1={ SELECT User FROM Artifact.Windows.System.Users() }) as Users FROM scope()
```

Will return a single row with Users being an array of names.


