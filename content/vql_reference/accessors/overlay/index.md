---
title: overlay
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Merges several paths into a single path.

  This accessor allows an overlay of several other paths as possible
  prefixes.  For example consider the following base paths:

  - /bin/
  - /usr/bin/

  Then when attempting to open the file "ls", this accessor first
  searches for it in /bin/ls, then /usr/bin/ls.

  The search paths are selected using a scope variable:

  ```vql
  LET OVERLAY_ACCESSOR_DELEGATES <= dict(
     accessor="file",
     paths=["/bin", "/usr/bin"])

  SELECT * FROM glob(globs='*', accessor="overlay")
  ```

build:
  list: never
---



{{< badge >}}Accessor{{< /badge >}}

Arg | Description | Type
----|-------------|-----
paths|A list of paths to try to resolve.|list of OSPath (required)
accessor|File accessor|string
### Description

Merges several paths into a single path.

This accessor allows an overlay of several other paths as possible
prefixes.  For example consider the following base paths:

- /bin/
- /usr/bin/

Then when attempting to open the file "ls", this accessor first
searches for it in /bin/ls, then /usr/bin/ls.

The search paths are selected using a scope variable:

```vql
LET OVERLAY_ACCESSOR_DELEGATES <= dict(
   accessor="file",
   paths=["/bin", "/usr/bin"])

SELECT * FROM glob(globs='*', accessor="overlay")
```


