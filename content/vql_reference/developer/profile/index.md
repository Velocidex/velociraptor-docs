---
title: profile
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Returns a profile dump from the running process.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
allocs|A sampling of all past memory allocations|bool
block|Stack traces that led to blocking on synchronization primitives|bool
goroutine|Stack traces of all current goroutines|bool
heap|A sampling of memory allocations of live objects.|bool
mutex|Stack traces of holders of contended mutexes|bool
profile|CPU profile.|bool
trace|CPU trace.|bool
debug|Debug level|int64
logs|Recent logs|bool
queries|Recent Queries run|bool
metrics|Collect metrics|bool
duration|Duration of samples (default 30 sec)|int64
type|The type of profile (this is a regex of debug output types that will be shown).|string

**Required permissions:** `MACHINE_STATE`

### Description

Returns a profile dump from the running process.

