---
title: delay
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Executes 'query' and delays relaying the rows by the specified number of seconds.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
query|Source for rows.|StoredQuery (required)
delay|Number of seconds to delay.|int64 (required)
buffer_size|Maximum number of rows to buffer (default 1000).|int64
### Description

Executes 'query' and delays relaying the rows by the specified number of seconds.

