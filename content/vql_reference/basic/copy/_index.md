---
title: copy
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## copy
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|The file to copy from.|string (required)
accessor|The accessor to use|string
dest|The destination file to write.|string (required)
permissions|Required permissions (e.g. 'x').|string
append|If true we append to the target file otherwise truncate it|bool

### Description

Copy a file.

The source file can use any accessor - for example one can copy
the $MFT using the ntfs accessor to a regular file. Another
example is to extract a file from a zip file using the `zip`
accessor into a file on disk.

This function can also be used to create new files with prescribed
content - for example:

```vql
SELECT copy(filename="Hello world", accessor="data", dest="C:/hi.txt")
FROM scope()
```

NOTE: Sparse files are padded out


