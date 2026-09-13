---
title: hunt_reindex
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Reindex a hunt.

  This is sometimes necessary if hunt overview stats are
  incorrect. This plugin will walk all hunt flows and re-tally all
  the stats to reset the hunt overview into the correct values.

  On some installations this is a very expensive operation as it
  generates a lot of IO.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
hunt_id|The hunt to reindex. If not specified we index all hunts|string
### Description

Reindex a hunt.

This is sometimes necessary if hunt overview stats are
incorrect. This plugin will walk all hunt flows and re-tally all
the stats to reset the hunt overview into the correct values.

On some installations this is a very expensive operation as it
generates a lot of IO.


