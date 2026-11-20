# parse_unified_logs



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
base|A base directory containing all the required files (.tracev3, .timesync, uuidtext, dsc).|OSPath (required)
accessor|The accessor to use.|string
threads|The number of threads to use (defalut 5).|int64

**Required permissions:** `FILESYSTEM_READ`

### Description

Parses MACOS unified logs.


