---
title: atoi
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Convert a string to an integer.

  The string may begin with a sign ("+" or "-") and a prefix
  indicating a base: "0b" for base2 , "0" or "0o" for base8, "0x"
  for base16. It may contain underscores ("_").

  This function is essentially a wrapper around Golang's
  `strconv.ParseInt()` function.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
string|A string to convert to int|Any (required)
### Description

Convert a string to an integer.

The string may begin with a sign ("+" or "-") and a prefix
indicating a base: "0b" for base2 , "0" or "0o" for base8, "0x"
for base16. It may contain underscores ("_").

This function is essentially a wrapper around Golang's
`strconv.ParseInt()` function.


