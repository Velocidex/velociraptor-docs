---
title: now
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## now
<span class='vql_type label label-warning pull-right page-header'>Function</span>


### Description

Returns the current time in seconds since epoch.

Note that an integer value is returned, not a timestamp.

Typically this function is used together with the `timestamp` function to
create a timestamp object which can be used in datetime comparisons.

### Examples

Creating a timestamp representing the current time:

`timestamp(epoch=now())`

Creating a timestamp representing an hour ago:

`timestamp(epoch=now() - 3600)`

Using `now()` in timestamp arithmetic:

```vql
SELECT * FROM flows(client_id="C.8cfee3cef5dc6915")
WHERE state =~ "FINISHED" AND timestamp(epoch=active_time) > now() - 60 * 60 * 24
```

Note that the above time comparison works even though `now() - 60 * 60 * 24`
results in an integer. This is because one of the operands is a timestamp
object, so VQL will convert the int to a timestamp for purposes of the
comparison.

### See also

- [timestamp](/vql_reference/basic/timestamp/)


