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

This plugin uses the libyara library to scan files. It is common
to provide a large number of rules to the `rules` parameter. The
plugin will compile the rules and reuse this compiled rules for
each invocation. By default the md5 hash of the ruleset is used to
cache the rules with, but you can provide a separate `key` for
caching these rules for more efficiency.

It is therefore appropriate to repeatedly call the yara() plugin
many times on many different files for scanning.

## Notes:

Many yara rules have conditions that span large distances between
signatures. For example, the condition might check the header of
the file as well as some strings which may appear deep within the
file.

Libyara natively supports these rules by use `mmap` to map the
entire file into memory. While this approach works well it can
only work on real files. Velociraptor abstracts access to the
files using the `accessor`.

As an optimization, Velociraptor will delegate some accessors to
libyara if the underlying file is a physical file on the
filesystem. For example, when using the `auto` or `file`
accessors, the underlying file can be `mmaped` by the system so we
just pass the real file name to libyara. When operating in this
mode, the `blocksize` parameter is ignored since the entire file
is scanned as a single block.

However, when using accessors such as `zip`, `ntfs` etc, the
underlying files do not exist in a form that can be `mmaped` by
the operating system. In those cases, this plugin resorts to
scanning the file using memory buffers.

When scanning in this way, a buffer is allocated (the size is
determined by the `blocksize` parameter). The rules will be
applied on each buffer separately. Therefore rules that rely on
matching strings further apart from the buffer size will not
match. Similarly, it is possible that strings are split across
buffers causing some rules to not match correctly.

If `force_buffers` is specified, the plugin will use buffer
scanning in all cases (even when `mmap` would work). Similarly if
libyara is unable to `mmap` the file, the plugin will switch to
buffer scanning.

### Rate limiting and throttling.

Because this plugin works by calling the underlying C library,
Velociraptor does not have the ability to pause execution mid
call. This is especially problematic when using `mmaped` mode and
scanning very large files. If rate limiting is important to you,
limit the size of the files that are scanned or consider using
buffered mode (depending on the available ruleset).

## Yara version and support

The current version of the yara library in `v4.5.4`. The following
modules are enabled.

* `pe`
* `elf`
* `math`
* `time`
* `dotnet`

The yara library is **not** currently compiled with `openssl`
support. This means that some fields are not
available. Specifically in the `pe` module:

* `pe.signatures`
* `pe.is_signed`
* `pe.number_of_signatures`

In previous versions these fields were completely removed but this
caused rules that use those fields to be rejected outright. This
caused problems when loading a large number of rules from external
sources, because it is difficult to identify and remove just the
offending rules.

In current versions, the fields are defined but are never
populated. This allows rules that reference those fields to be
loaded cleanly but any conditions will not match. Considering that
signatures can be easily invalidated, robust rules typically have
other conditions as a fallback so the impact should be minimal.


