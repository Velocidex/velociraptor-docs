# read_file



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
length|Max length of the file to read.|int
offset|Where to read from the file.|int64
filename|One or more files to open.|OSPath (required)
accessor|An accessor to use.|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Read a file into a string.



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
chunk|length of each chunk to read from the file.|int
max_length|Max length of the file to read.|int
filenames|One or more files to open.|list of OSPath (required)
accessor|An accessor to use.|string

**Required permissions:** `FILESYSTEM_READ`

### Description

Read files in chunks.

This plugin reads a file in chunks and returns each chunks as a separate row.

It is useful when we want to report file contents for small files like
configuration files etc.

The returned row contains the following columns: data, offset, filename



