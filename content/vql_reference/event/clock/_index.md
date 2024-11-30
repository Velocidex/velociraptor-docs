---
title: clock
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## clock
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
start|Start at this time.|Any
period|Wait this many seconds between events.|int64
ms|Wait this many ms between events.|int64

### Description

Generate a timestamp periodically. This is mostly useful for event
queries.

This plugin generates events periodically. The periodicity can be
controlled either via the `period` or the `ms` parameter. Each row
will be a go [time.Time](https://golang.org/pkg/time/#Time)
object. You can access its unix epoch time with the Sec column.

### Example

The following will generate an event every 10 seconds.

```vql
SELECT Second FROM clock(period=10)
```

The `start` parameter can be used to schedule the plugin to start
at a particular time. This can be an integer (which will be
interpreted as seconds since the epoch), a string or a time value.


