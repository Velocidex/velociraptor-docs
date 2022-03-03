---
title: profile
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## profile
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

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

### Description

Returns a profile dump from the running process.

