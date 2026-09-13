---
title: utf16
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parse input from utf16.

  ### Example

  ```vql
  utf16(string='A\x00B\x00C\x00D\x00') -> "ABCD"
  ```

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)
### Description

Parse input from utf16.

### Example

```vql
utf16(string='A\x00B\x00C\x00D\x00') -> "ABCD"
```


