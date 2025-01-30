---
title: "YARA in Velociraptor"
date: 2025-01-24
draft: true
weight: 60
---

the yara() plugin can scan files in one of two ways - using libyara directly or
using Velociraptor accessors using libyara directly has some advantages - what
it does is mmap the whole file into memory and so a rule can match any part of
the file at the same time

so when you call yara() without an accessor specified (or with "auto" accessor)
we just delegate to libyara to do the scanning. If you use an accessor then we
read the data in buffers and scan a buffer at the time
(https://docs.velociraptor.app/vql_reference/parsers/yara/ - this is where
blocksize comes in)

the disadvantage here is that the rule can only really match one buffer at the time
but limiting the iops can not work with libyara way because we dont control it
it only works when using the accessor
