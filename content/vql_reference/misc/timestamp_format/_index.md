---
title: timestamp_format
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## timestamp_format
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
time|Time to format|Any (required)
format|A format specifier as per the Golang time.Format. Additionally any constants specified in https://pkg.go.dev/time#pkg-constants can be used.|string

### Description

Format a timestamp into a string.

This uses the same type of format string as described
https://pkg.go.dev/time#Time.Format . You can also use any of the
constants described in https://pkg.go.dev/time#pkg-constants as a
shorthand to common time formatting directives.

The output timezone is UTC by default but can be changed using the
`TZ` VQL variable.

Example:

```vql
LET TZ="Europe/Berlin"

SELECT timestamp_format(time=now(), format="RFC3339") FROM scope()

> "2024-08-29T02:05:23+02:00"
```


