---
title: bzip2
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## bzip2
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access the content of bzip2 files.

The bzip2 accessor is able to read the content of `bz2` compressed
files. It is very similar to the `gzip` accessor.

Since `bzip2` compressed files do not have an actual file hierarchy,
they can not be directly searched with `glob()`. This accessor is
therefore only really useful for opening the file for reading - or for
chaining with another accessor.

```vql
SELECT read_file(accessor="bzip2", filename="F:/hello.txt.bz2", length=10)
FROM scope()
```

Performance: Bzip2 files are non-seekable. This means they must be
read in sequence from start to finish. If the VQL query attempts to
seek within the file, this accessor will automatically decompress the
entire file into a temporary file so it can seek within it. This means
that performance can be extremely bad in some cases.


