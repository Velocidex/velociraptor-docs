---
title: parse_pe
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_pe
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The PE file to open.|OSPath (required)
accessor|The accessor to use.|string
base_offset|The offset in the file for the base address.|int64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Parse a PE file.

This function parses a PE file from disk or memory to extract the
different aspects of the PE file. The fields include:

- FileHeader: The basic PE file header information.
- Directories: The different directories in the PE file (For
  example Export_Directory, IAT_Directory etc).
- VersionInformation: The VersionInformation field contains
  metadata about the binary.
- Imports: Parses the Import table of the PE file.
- Exports: Parses the export table of the PE file.
- Forward: Any linker forward to other DLLs.
- Authenticode: Calculates the Authenticode hash of the PE file
  and also check if it is trusted.

The result of `parse_pe()` is a lazily evaluated dict. This means
that only as fields are accessed the relevant data is
calculated. This allows callers to be selective in what fields
they get.

For example, the `Authenticode` and `AuthenticodeHash` fields are
usually fairly expensive to calculate (as they need to hash the
file and compare signatures etc).

If you dont need that field you can remove it or select only some
fields using [set
operations](https://docs.velociraptor.app/knowledge_base/tips/set_operations/). This will make the operations a lot faster.

```vql
LET FieldMask <= dict(VersionInformation=TRUE, Imports=TRUE)
LET ExcludeFields <= dict(AuthenticodeHash=TRUE)

SELECT parse_pe(file="C:/Windows/Notepad.exe") * FieldMask AS PEInfo,
       parse_pe(file="C:/Windows/Notepad.exe") - ExcludeFields AS MorePEInfo
FROM scope()
```

## Parsing PE files from memory

On Windows, when an executable is loaded into memory, the PE file
is mapped directly into memory. It is therefore possible to parse
the PE file from memory itself using the "process" accessor (in a
similar way to the `pedump` plugin from Volatility)

To do this you need to know the memory address where the PE file
is loaded at. This is usually called the BaseAddress and plugins
like `vad()` can provide it for a running process.

```vql
LET FieldsToClear <= dict(AuthenticodeHash=TRUE,
                          Authenticode=TRUE)

SELECT *, parse_pe(accessor="process",
                   file=str(str=getpid()),
                   base_offset=Address) - FieldsToClear AS PEInfo
FROM vad(pid=getpid())
WHERE MappingName =~ ".exe$"
```

Note that when parsing from memory it is likely that some of the
memory would be changed from the pure, on disk PE file. Therefore
things like authenticode signatures are unlikely to be correct. It
is usually safer to remove these fields because they may not be
that relevant or corrupted and may result in slowing down the
query.


