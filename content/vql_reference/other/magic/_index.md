---
title: magic
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## magic
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Path to open and hash.|OSPath (required)
accessor|The accessor to use|string
type|Magic type (can be empty or 'mime' or 'extension')|string
magic|Additional magic to load|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Identify a file using magic rules.

Magic rules are designed to identify a file based on a sequence of
tests. They are a great way of quickly triaging a file type based
on its content, not its name.

Detection is facilitated via libmagic - a common library powering
the unix "file" utility. Velociraptor comes with all of "file"
basic magic signatures.

You can also write your own signatures using the magic syntax (see
https://man7.org/linux/man-pages/man4/magic.4.html )

### Example

The following will check all files in /var/lib applying a custom
magic rule.

```vql
LET Magic = '''
0 search/1024 "GET Apache Logs
!:strength + 100
'''

SELECT FullPath, Size, magic(path=FullPath, magic=Magic)
FROM glob(globs="/var/lib/*")
```

NOTE: `magic()` requires reading the headers of each file which
causes the file to be opened. If you have on-access scanning such
as Windows Defender "Realtime monitoring", applying magic() on
many files (e.g. in a glob) may result in substantial load on the
endpoint.


