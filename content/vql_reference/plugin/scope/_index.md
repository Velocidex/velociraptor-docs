---
title: scope
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## scope
<span class='vql_type pull-right page-header'>Plugin</span>


### Description

The scope plugin returns the current scope as a single row.

The main use for this plugin is as a NOOP plugin in those cases we
dont want to actually run anything.

### Example

```vql
SELECT 1+1 As Two FROM scope()
```


