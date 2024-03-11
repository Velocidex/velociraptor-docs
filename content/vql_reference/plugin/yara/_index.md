---
title: yara
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## yara
<span class='vql_type pull-right page-header'>Plugin</span>



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

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Scan files using yara rules.

The `yara()` plugin applies a signature consisting of multiple rules
across files. You can read more about [yara rules](https://yara.readthedocs.io/en/v4.2.3/writingrules.html). The
accessor is used to open the various files which allows this plugin to
work across raw ntfs, zip members or indeed process memory.

There are two modes supported. If the accessor is "process" or
"file", we delegate scanning directly to the yara library. This
allows yara to see the entire file and apply signatures that span
large offset differences (e.g. a signature looking for a string in
the middle of the file and the header).

For other accessors we need to use buffer scanning. In this mode,
Velociraptor will read buffers from the accessor and apply the
yara library to the buffer. Due to limitations in the yara API, it
is not possible to match signatures that are split on buffer
boundaries. You can choose the block size to try to fit the entire
signature with each block.

If the accessor is **not** specified we use the yara library to
directly open the file itself without Velociraptor's accessor
API. This allows Yara to mmap the file which has a number of
benefits including:

  1. The ability to scan without reading in blocks - so a
     signature matching the file header as well as a string deep
     within the file works.

  2. Various Yara extensions like the `pe` extension work allowing
     rules that use such extensions to work properly.

If we are not able to open the file (for example due to sharing
violations), Velociraptor will automatically fall back to the ntfs
accessor (on Windows) and will automatically switch to block by
block scanning.

Typically the yara rule does not change for the life of the query,
so Velociraptor caches it to avoid having to recompile it each
time. The `key` variable can be used to uniquely identify the
cache key for the rule. If the `key` variable is not specified, we
use the rule text itself to generate the cache key. It is
recommended that the `key` parameter be specified because it makes
it more efficient since we do not need to hash the rules each time.

You can supply a `compiled yara rule` as produced by the `yarac`
program. This is not recommended because it is not portable - the
rule must have been compiled with the exact same version of Yara
that is embedded in Velociraptor (Currently 4.5.0). Compiled rules
are generally larger too than the plain text rules.

When creating an artifact which requires a yara rule, set the type
of the parameter to `yara` and Velociraptor will offer a context
sensitive Yara rule editor in the GUI (simply press ? to bring up
a rule template). This makes it easier to write quick rules in the
GUI.

{{% notice note %}}

By default only the first 100mb of the file are scanned and
scanning stops after one hit is found.

{{% /notice %}}

### Compatibility with yara rules.

The YARA engine supports a number of directives that bring in
unreasonably sized dependencies. Velociraptor's Yara integration
disables directive importing dependencies such as openssl and
libmagic. This means that some rule conditions do not work (for
example `pe.number_of_signatures`). Other condition are still
supported (e.g. `pe.imphash()`). You can usually find equivalents
to the Yara plugins in VQL plugins so rules can be rewritten to
avoid this limitation.

If you have a large number of rules, you may use the `yara-tools`
repository https://github.com/Velocidex/yara-tools to clean up the
rules and verify that they will work with Velociraptor's yara
engine. The tool will automatically remove rules that are
incompatible with Velociraptor and reduce the size of the rules by
removing metadata and extra fluff.


