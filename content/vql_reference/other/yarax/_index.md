---
title: yarax
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## yarax
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
blocksize|Blocksize for scanning (10mb).|uint64
key|If set use this key to cache the  yara rules.|string
namespace|The Yara namespece to use.|string
vars|The Yara variables to use.|ordereddict.Dict
dll_path|Function to resolve path to the yarax DLL|Lambda (required)
force_buffers|Force buffer scan in all cases.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>
<span class="permission_list linkcolour label label-important">EXECVE</span>

### Description

Scan files using yara rules (Using the new yarax engine).

This is an experimental new functionality to use the
[YaraX](https://github.com/VirusTotal/yara-x) project instead of
the more traditional C based Yara engine.

One of the biggest issues for Velociraptor integration is the very
large size of the `YaraX` library (which is written in
Rust). Including `YaraX` in Velociraptor will increase our binary
size by a third (about 25Mb) for a single experimental plugin.

Therefore, we have decided to distribute `YaraX` as a [third party
tool](https://docs.velociraptor.app/docs/artifacts/tools/) and
load the DLL at runtime.

You must specify a lambda function to the `dll_path` parameter
which will be evaluated only if needed. The function should return
the absolute path to the YaraX DLL on disk. Once the dll is
loaded, it is not unloaded again. This way you can avoid having to
download or hash the dll until actually needed.


