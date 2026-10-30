---
title: enumerate
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Collect all the items in each group by bin.

  This is an aggregate function that keeps track of all elements in
  a GROUP BY group.

  ### Notes

  Use this function carefully as memory use can be large. It
  keeps a copy of every element in the group and that can be very
  large for large result sets.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
items|The items to enumerate|Any
### Description

Collect all the items in each group by bin.

This is an aggregate function that keeps track of all elements in
a GROUP BY group.

### Notes

Use this function carefully as memory use can be large. It
keeps a copy of every element in the group and that can be very
large for large result sets.


