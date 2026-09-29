# watch_journald



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|A list of journal log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
raw|Emit raw events (not parsed).|bool

**Required permissions:** `FILESYSTEM_READ`

### Description

Watch a journald file and stream events from it. 


