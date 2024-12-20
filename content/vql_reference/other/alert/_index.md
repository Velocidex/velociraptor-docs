---
title: alert
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## alert
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name of the alert.|string (required)
dedup|Suppress same message in this many seconds (default 7200 sec or 2 hours).|int64
condition|If specified we ignore the alert unless the condition is true|Any

### Description

Generate an alert message.

### See also

- [log]({{< ref "/vql_reference/popular/log/" >}}): alerts and log messages are similar in
  concept and use the same deduplication mechanism which is explained with
  examples for the `log()` function.


