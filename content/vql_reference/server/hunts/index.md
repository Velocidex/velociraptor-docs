---
title: hunts
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Retrieve the list of hunts.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
hunt_id|A hunt id to read, if not specified we list all of them.|string
summary|If specified we fetch just the basic summary of the flow. This is a bit faster.|bool

**Required permissions:** `READ_RESULTS`

### Description

Retrieve the list of hunts.


