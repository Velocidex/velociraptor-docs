# split_records



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filenames|Files to parse.|list of OSPath (required)
accessor|The accessor to use|string
regex|The split regular expression (e.g. a comma, default whitespace)|string
columns|If the first row is not the headers, this arg must provide a list of column names for each value.|list of string
first_row_is_headers|A bool indicating if we should get column names from the first row.|bool
count|Only split into this many columns if possible.|int
record_regex|A regex to split data into records (default |string
buffer_size|Maximum size of line buffer (default 64kb).|int

**Required permissions:** `FILESYSTEM_READ`

### Description

Parses files by splitting lines into records.


