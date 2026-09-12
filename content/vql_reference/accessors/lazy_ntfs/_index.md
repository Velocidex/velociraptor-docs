---
title: lazy_ntfs
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Access the NTFS filesystem by parsing NTFS structures.

  This accessor is a variation of the `ntfs` accessor. It is a bit
  faster because it does not enumerate all the attributes in files
  contained in directories, instead relying only on the `I30` index
  streams. This means it is unable to find Alternate Data Streams in
  directories (because ADS are not stored in the I30 stream).

  Usually the extra performance is not worth these limitations since the
  `ntfs` accessor is pretty fast these days already.

build:
  list: never
---



{{< badge >}}Accessor{{< /badge >}}

### Description

Access the NTFS filesystem by parsing NTFS structures.

This accessor is a variation of the `ntfs` accessor. It is a bit
faster because it does not enumerate all the attributes in files
contained in directories, instead relying only on the `I30` index
streams. This means it is unable to find Alternate Data Streams in
directories (because ADS are not stored in the I30 stream).

Usually the extra performance is not worth these limitations since the
`ntfs` accessor is pretty fast these days already.


