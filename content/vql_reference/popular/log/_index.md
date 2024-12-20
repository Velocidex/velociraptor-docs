---
title: log
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## log
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
message|Message to log.|string (required)
dedup|Suppress same message in this many seconds (default 60 sec). Use -1 to disable dedup.|int64
args|An array of elements to apply into the format string.|Any
level|Level to log at (DEFAULT, WARN, ERROR, INFO, DEBUG).|string

### Description

Log a message to the query log stream. Always returns TRUE.

The `message` parameter represents a format string
that will be expanded using the `args` parameter list if needed.

Since `log()` always returns TRUE it is easy to use in a WHERE
clause as a form of debugging. It is basically equivalent to the
print statement of other languages.

```vql
SELECT * FROM glob(...)
WHERE log(message="Value of OSPath is %v", args=OSPath)
```

### Deduplication

Log messages will be deduped according to the `dedup`
parameter - each **distinct format string** will not be emitted more
frequently than the `dedup` parameter (by default 60 seconds).

This makes it safe to use `log()` frequently without flooding
the logs stream.

```vql
SELECT * FROM range(end=_value)
WHERE log(message="Value is %v", args=_value)
```

Will only emit a single message due to the format string being
deduped.

This property makes it useful to add progress logging to long
running artifacts. The logs will be emitted every minute.

```vql
SELECT * FROM glob(...)
WHERE log(message="Processing file %v", args=OSPath)
```

### Example

In this more complex example the query will produce 10 rows, at a rate of
1 row every 5 seconds. However the log messages will be limited to 1 every
15 seconds.

```vql
SELECT count() AS Count, String AS EventTime FROM clock(period=5)
WHERE log(message="Logging #%v at %v", args=[Count, EventTime], level="INFO", dedup=15)
LIMIT 10
```

Thus the log message will be emitted for the 1st, 4th, 7th, and 10th rows.
To observe the deduplication behaviour in real time you can run this query
in a notebook cell and tweak the arguments to understand their impacts.

### See also

- [format]({{< ref "/vql_reference/popular/format/" >}}): a function that uses the same
  string formatting syntax.
- [alert]({{< ref "/vql_reference/other/alert/" >}}): alerts are a special type of log
  message that are added to a server alerts queue, which can be monitored.


