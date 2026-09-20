---
title: watch_jsonl
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Watch a jsonl file and stream events from it.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int

**Required permissions:** `FILESYSTEM_READ`

### Description

Watch a jsonl file and stream events from it.

