---
title: commandline_split
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Split a commandline into separate components following the windows
  conventions.

  ### Example

  ```vql
  SELECT
    commandline_split(command='''"C:\Program Files\Velociraptor\Velociraptor.exe" service run'''),
    commandline_split(command="/usr/bin/ls -l 'file with space.txt'", bash_style=TRUE)
  FROM scope()
  ```

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
command|Commandline to split into components.|string (required)
bash_style|Use bash rules (Uses Windows rules by default).|bool
### Description

Split a commandline into separate components following the windows
conventions.

### Example

```vql
SELECT
  commandline_split(command='''"C:\Program Files\Velociraptor\Velociraptor.exe" service run'''),
  commandline_split(command="/usr/bin/ls -l 'file with space.txt'", bash_style=TRUE)
FROM scope()
```


