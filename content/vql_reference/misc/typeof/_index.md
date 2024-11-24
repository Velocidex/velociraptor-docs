---
title: typeof
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## typeof
<span class='vql_type pull-right page-header'>Function</span>


### Description

Print the underlying Go type of the variable.

You can use any Keyword arg, the first one will be returned.

### Example

```sql
SELECT typeof(x=1) AS Type FROM scope()
```


