---
title: switch
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Conditional execution of multiple queries in order

  Executes each query in order. If a query returns any rows, those
  are emitted. Any further queries are ignored.

  For example:
  ```vql
  SELECT * FROM switch(a={
    SELECT * FROM First
  }, b={
    SELECT * FROM Second
  })
  ```

---



<div class="vql_item"></div>


## switch
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>


### Description

Conditional execution of multiple queries in order

Executes each query in order. If a query returns any rows, those
are emitted. Any further queries are ignored.

For example:
```vql
SELECT * FROM switch(a={
  SELECT * FROM First
}, b={
  SELECT * FROM Second
})
```


