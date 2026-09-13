---
title: process_tracker_callchain
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Get a call chain from the global process tracker.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
id|Process ID.|string (required)
max_items|The maximum number of process entries to return (default 10)|int64
### Description

Get a call chain from the global process tracker.

