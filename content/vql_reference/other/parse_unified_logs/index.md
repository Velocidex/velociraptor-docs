---
title: parse_unified_logs
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parses MACOS unified logs.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
base|A base directory containing all the required files (.tracev3, .timesync, uuidtext, dsc).|OSPath (required)
accessor|The accessor to use.|string
threads|The number of threads to use (defalut 5).|int64

**Required permissions:** `FILESYSTEM_READ`

### Description

Parses MACOS unified logs.

