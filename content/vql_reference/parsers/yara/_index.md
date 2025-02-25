---
title: yara
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## yara
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
rules|Yara rules in the yara DSL or after being compiled by the yarac compiler.|string
files|The list of files to scan.|list of Any (required)
accessor|Accessor (e.g. ntfs,file)|string
context|How many bytes to include around each hit|int
start|The start offset to scan|uint64
end|End scanning at this offset (100mb)|uint64
number|Stop after this many hits (1).|int64
blocksize|Blocksize for scanning (1mb).|uint64
key|If set use this key to cache the  yara rules.|string
namespace|The Yara namespece to use.|string
vars|The Yara variables to use.|ordereddict.Dict
force_buffers|Force buffer scan in all cases.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Scan files using yara rules.

