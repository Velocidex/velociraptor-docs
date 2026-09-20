---
title: sql
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Run queries against sqlite, mysql, and postgres databases
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
driver|sqlite, mysql,or postgres|string (required)
connstring|SQL Connection String|string
file|Required if using sqlite driver|OSPath
accessor|The accessor to use if using sqlite|string
query||string (required)
args||Any

**Required permissions:** `FILESYSTEM_READ`, `NETWORK`

### Description

Run queries against sqlite, mysql, and postgres databases

