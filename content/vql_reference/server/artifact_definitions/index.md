---
title: artifact_definitions
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Dump artifact definitions from the internal repository.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
names|Artifact definitions to dump|list of string
deps|If true includes all dependencies as well.|bool
sanitize|If true we remove extra metadata.|bool

**Required permissions:** `READ_RESULTS`

### Description

Dump artifact definitions from the internal repository.

