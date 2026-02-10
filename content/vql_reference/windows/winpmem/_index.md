---
title: winpmem
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## winpmem
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
service|The name of the driver service to install.|string
image_path|If specified we write a physical memory image on this path.|string
compression|When writing a memory image use this compression (default none) can be none, s2, snappy, gzip.|string
driver_path|Specify where to extract the driver - by default we use the temp folder|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Uses the `winpmem` driver to take a memory image.

This plugin is also needed to facilitate the winpmem accessor.

When the `image_path` parameter is not set this function will load
the `winpmem` driver until the scope is destroyed at the end of
the query (where the driver will be unloaded).

If the `image_path` parameter is give, the path will be used to
create a raw memory image. The image can be compressed using a
number of algorithms such as:

1. None - no compression (default)

2. S2 or snappy - these are fast algorithms with poor compression
   ratio but should result in some speed up over no compression.

3. The Gzip method is used to produce a compatible gzip file. This
   is very slow and so it is not suitable for large memory systems
   as there will be too much smear.


### Example

```vql
SELECT winpmem(image_path='c:/test.dd', compression='s2') FROM scope()
```


