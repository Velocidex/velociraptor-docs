# upload_directory



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|Filename to be stored within the output directory|OSPath
accessor|The accessor to use|string
output|An output directory to store files in.|string (required)
mtime|Modified time to set the output file.|Any
atime|Access time to set the output file.|Any
ctime|Change time to set the output file.|Any
btime|Birth time to set the output file.|Any

**Required permissions:** `FILESYSTEM_WRITE`

### Description

Upload a file to an upload directory. The final filename will be
the output directory path followed by the filename path.



