---
title: count
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Counts the items.

  This function is an aggregation function that counts the number of
  times it is evaluated per group by context. It is useful in a
  GROUP BY clause to count the number of items in each group.

  You can also use it in a regular query to produce a row
  count. NOTE: When used in this way it only counts the total number
  of rows that are actually evaluated (i.e. not filtered out) due to
  the lazy evaluation property of VQL columns.

  For a full discussion of aggregate functions see
  https://docs.velociraptor.app/docs/vql/#aggregate-functions

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
items|Not used anymore|Any
### Description

Counts the items.

This function is an aggregation function that counts the number of
times it is evaluated per group by context. It is useful in a
GROUP BY clause to count the number of items in each group.

You can also use it in a regular query to produce a row
count. NOTE: When used in this way it only counts the total number
of rows that are actually evaluated (i.e. not filtered out) due to
the lazy evaluation property of VQL columns.

For a full discussion of aggregate functions see
https://docs.velociraptor.app/docs/vql/#aggregate-functions


