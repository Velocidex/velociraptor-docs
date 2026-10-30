---
title: write_crypto_file
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Write a query into an encrypted local storage file.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|Path to the file to write|OSPath (required)
query|query to write into the file.|StoredQuery (required)
max_wait|How often to flush the file (default 60 sec).|uint64
max_rows|How many rows to buffer before writing (default 1000).|uint64
max_size|When the file grows to this size, truncate it (default 1Gb).|uint64

**Required permissions:** `FILESYSTEM_WRITE`

### Description

Write a query into an encrypted local storage file.

