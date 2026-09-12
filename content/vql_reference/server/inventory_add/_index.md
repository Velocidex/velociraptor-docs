---
title: inventory_add
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Add or reconfigure a tool into the inventory.

  Note that if you provide a file to override the tool it must be
  readable by the server (so the file must reside on the server or
  be accessible over a network share).

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
tool||string (required)
serve_locally||bool
url||string
hash||string
filename|The name of the file on the endpoint|string
version||string
file|An optional file to upload|OSPath
accessor|The accessor to use to read the file.|string

**Required permissions:** `SERVER_ADMIN`

### Description

Add or reconfigure a tool into the inventory.

Note that if you provide a file to override the tool it must be
readable by the server (so the file must reside on the server or
be accessible over a network share).


