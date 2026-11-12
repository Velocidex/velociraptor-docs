# unzip



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|File to unzip.|OSPath (required)
accessor|The accessor to use|string
filename_filter|Only extract members matching this regex filter.|string
output_directory|Where to unzip to|string (required)
type|The type of file (default autodetected from file extension - zip or tgz or tar.gz).|string

**Required permissions:** `FILESYSTEM_WRITE`, `FILESYSTEM_READ`

### Description

Unzips a file into a directory.

This plugin supports a number of compression formats:
1. Zip files
2. Tar gz files.

The type of the file will be detected by the file extension, or
else you can force a type using the `type` parameter (`tgz` or
`zip`).



