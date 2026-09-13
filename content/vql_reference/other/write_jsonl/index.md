---
title: write_jsonl
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Write a query into a JSONL file.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|JSONL files to open|OSPath (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)
buffer_size|Maximum size of buffer before flushing to file.|int
max_time|Maximum time before flushing the buffer (10 sec).|int
append|Append JSONL records to existing file.|bool

**Required permissions:** `FILESYSTEM_WRITE`

### Description

Write a query into a JSONL file.

