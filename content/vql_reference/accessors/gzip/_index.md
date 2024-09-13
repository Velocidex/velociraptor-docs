---
title: gzip
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## gzip
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access the content of gzip files.

The filename is a pathspec with a delegate accessor opening the
actual gzip file.

Since `gzip` compressed files do not have an actual file hierarchy,
they can not be directly searched with `glob()`. This accessor is
therefore only really useful for opening the file for reading - or for
chaining with another accessor.

```sql
SELECT read_file(accessor="gzip", filename="F:/hello.txt.gz", length=10)
FROM scope()
```

Performance: `GZIP` files are non-seekable. This means they must be
read in sequence from start to finish. If the VQL query attempts to
seek within the file, this accessor will automatically decompress the
entire file into a temporary file so it can seek within it. This means
that performance can be extremely bad in some cases.


