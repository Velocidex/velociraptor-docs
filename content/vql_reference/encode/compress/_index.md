---
title: compress
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Compress a file using GZip.

  The file is compressed using gzip. You can change the location of
  the output using the output parameter.

  Note that output is a required parameter - you can consult how
  paths are handled in Velociraptor to correctly manipulate paths

  https://docs.velociraptor.app/docs/forensic/filesystem/paths/

  ## Example

  ```vql
  SELECT OSPath, compress(path=OSPath, output=OSPath.Dirname + ( OSPath.Basename + ".gz")) AS Compressed
  FROM glob(globs="C:/Windows/*.exe")
  ```

  Unlike the common `gzip` utility the file is not removed after compression.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|A path to compress|string (required)
output|A path to write the output - default is the path with a .gz extension|string (required)

**Required permissions:** `FILESYSTEM_WRITE`, `FILESYSTEM_READ`

### Description

Compress a file using GZip.

The file is compressed using gzip. You can change the location of
the output using the output parameter.

Note that output is a required parameter - you can consult how
paths are handled in Velociraptor to correctly manipulate paths

https://docs.velociraptor.app/docs/forensic/filesystem/paths/

## Example

```vql
SELECT OSPath, compress(path=OSPath, output=OSPath.Dirname + ( OSPath.Basename + ".gz")) AS Compressed
FROM glob(globs="C:/Windows/*.exe")
```

Unlike the common `gzip` utility the file is not removed after compression.


