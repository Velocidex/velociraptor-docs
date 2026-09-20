---
title: hunt_results
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Retrieve the results of a hunt.

  This plugin essentially iterates over all flows in the hunt and
  reads out all collected rows for each client in the same table.

  It is equivalent to the source() plugin in the hunt notebook
  context.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|The artifact to retrieve|string
source|An optional source within the artifact.|string
hunt_id|The hunt id to read.|string (required)
brief|If set we return less columns (deprecated).|bool
orgs|If set we combine results from all orgs.|list of string

**Required permissions:** `READ_RESULTS`

### Description

Retrieve the results of a hunt.

This plugin essentially iterates over all flows in the hunt and
reads out all collected rows for each client in the same table.

It is equivalent to the source() plugin in the hunt notebook
context.


