---
title: utf16_encode
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Encode a string to utf16 bytes.

  ### Example

  ```vql
  utf16_encode(string="ABCD") -> "A\u0000B\u0000C\u0000D\u0000"
  ```

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)
### Description

Encode a string to utf16 bytes.

### Example

```vql
utf16_encode(string="ABCD") -> "A\u0000B\u0000C\u0000D\u0000"
```


