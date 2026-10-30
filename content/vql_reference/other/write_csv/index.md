---
title: write_csv
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Write a query into a CSV file.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|OSPath (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)

**Required permissions:** `FILESYSTEM_WRITE`

### Description

Write a query into a CSV file.

