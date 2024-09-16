---
title: ntfs_vss
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## ntfs_vss
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access the NTFS filesystem by considering all VSS.

This accessor considers all Volume Shadow Copies available on the
system to deduplicate all files which are identical across all
VSS. Only files that have been modified are shown.

This makes it easier to compare files across VSS copies. If the
file is the same across all VSS then the accessor prefers to show
the one of the main device (i.e. `\\.\C:`)


