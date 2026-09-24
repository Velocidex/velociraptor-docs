# cat



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|File to open.|OSPath (required)
accessor|An accessor to use.|string
chunk|length of each chunk to read from the file.|int
timeout|If specified we abort reading after this much time.|int

**Required permissions:** `FILESYSTEM_READ`

### Description

Read files in chunks.

This is mostly useful for character devices on Linux or special files which can not be read in blocks.


