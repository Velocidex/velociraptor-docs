---
title: ntfs
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## ntfs
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access the NTFS filesystem by parsing NTFS structures.

This accessor uses an NTFS parser to present the content of the
NTFS filesystem as a simple filesystem. It emulates the regular
`file` accessor and its interpretation of the paths:

1. At the top level of the filesystem, this accessor enumerates all
fixed drives and VSS devices to present a list of valid devices
that may be parsed. For example a glob of `/*` gives:

- `\\.\C:` - The C drive device
- `\\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1` - The first VSS device.

2. The accessor will automatically convert from Windows paths to
NTFS paths. For example the path `C:/Windows` will be converted to
`\\.\C:\Windows`

This accessor is only available on Windows.

See the `raw_ntfs` accessor for more information and comparisons.


