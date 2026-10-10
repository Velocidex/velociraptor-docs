---
title: hash
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Calculate the hash of a file.

  This function calculates the MD5, SHA1 and SHA256 hashes of the file.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|Path to open and hash.|OSPath (required)
accessor|The accessor to use|string
hashselect|The hash function to use (MD5,SHA1,SHA256)|list of string
max_size|The maximum size of the file that will be hashed (default 100mb)|uint64

**Required permissions:** `FILESYSTEM_READ`

### Description

Calculate the hash of a file.

This function calculates the MD5, SHA1 and SHA256 hashes of the file.


