---
title: describe_address
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Describe an address in the PE text section.

  This is used to guess the function this address resides in. We
  look up the export table of the PE file and match the earliest
  exported address before the specified address.

  The information is cached for the life of the query so it is fast
  to use this to decorate many addresses.

  Example:

  ```vql
  LET DLL <= "C:/Windows/system32/ntdll.dll"

  SELECT _value.Name AS Name,
         _value.RVA AS RVA,
         describe_address(rva=_value.RVA + 10, module=DLL) AS Description
  FROM foreach(row=parse_pe(file=DLL).ExportRVAs)
  ```

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
rva|The Relative Virtual Address to describe.|int64 (required)
module|The path of the PE file to inspect.|string (required)

**Required permissions:** `FILESYSTEM_READ`

### Description

Describe an address in the PE text section.

This is used to guess the function this address resides in. We
look up the export table of the PE file and match the earliest
exported address before the specified address.

The information is cached for the life of the query so it is fast
to use this to decorate many addresses.

Example:

```vql
LET DLL <= "C:/Windows/system32/ntdll.dll"

SELECT _value.Name AS Name,
       _value.RVA AS RVA,
       describe_address(rva=_value.RVA + 10, module=DLL) AS Description
FROM foreach(row=parse_pe(file=DLL).ExportRVAs)
```


