---
title: secret_add
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Add a new secret
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
name|Name of the secret|string (required)
type|Type of the secret|string (required)
secret|A Dict containing key/value pairs for the secret|ordereddict.Dict (required)

**Required permissions:** `SERVER_ADMIN`

### Description

Add a new secret

