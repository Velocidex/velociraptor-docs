# parse_journald



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|A list of journal log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
raw|Emit raw events (not parsed).|bool
start_time|Only parse events newer than this time (default all times).|time.Time
end_time|Only parse events older than this time (default all times).|time.Time

**Required permissions:** `FILESYSTEM_READ`

### Description

Parse a journald file.


