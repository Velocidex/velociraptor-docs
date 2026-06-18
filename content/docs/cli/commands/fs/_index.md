---
menutitle: "fs (filesystem)"
title: 'The "fs" command group'
date: 2025-05-20
draft: false
weight: 60
summary: Run filesystem commands.
description: |
  These utility commands allow you to run filesystem commands on the local system,
  including "filesystem-like" formats, or against the Velociraptor server's
  filestore. They do this by exposing some VQL queries as CLI commands.
---

These utility commands allow you to run filesystem commands on the local system,
including "filesystem-like" formats, or against the Velociraptor server's
filestore. They do this by exposing some VQL queries as CLI commands.

The commands use Velociraptor's [accessors](/vql_reference/accessors/).

The supported accessors for the `fs` commands are:

- `file` (the default accessor)
- `ntfs`
- `reg` | `registry`
- `raw_reg`
- `zip`
- `lazy_ntfs`
- `file_links`
- `fs` (a Velociraptor filestore)

Glob patterns can be used.

The default output format is jsonl.

#### Server filestore access

When using the `fs` accessor, it needs to connect to the server's
filestore and therefore needs the `server.config.yaml` so that it
knows where to find the filestore. This means that such commands need
to be run with the `--config` (or `-c`) flag. The server does not need
to be running since this command reads the filestore directly.



###### Example: List filestore files and directories:

```text
velociraptor fs ls -c server.config.yaml --accessor fs "clients/*"
```


{{% notice note "Handling filestore compression" %}}

Since version 0.75, the default configuration instructs clients to
compress data before sending it to the server. The server stores the
data in compressed form, thus greatly reducing server storage
requirements. However, this means that files read directly from the
server's disk by external tools will still have this compression
applied.

The `fs zcat` subcommand is designed to cater for the new filestore
compression feature. It decompresses files read from the filestore, so
if external tools need to work with results or uploaded files then
they should call `velociraptor fs zcat` and read it's output via a
pipe.

While all the `fs` commands can use the `fs` accessor, although it's
only really useful for listing files and directories due to the
compression.

If you don't want the space-saving benefits of compression it can be
disabled via the
[`Datastore.compression`](/docs/deployment/references/#Datastore.compression)
config setting.

{{% /notice %}}

---



### [ fs ls ]

Equivalent VQL:

```vql
SELECT Name, Size, Mode.String AS Mode, Mtime, Data FROM glob(globs=path, accessor=accessor)`
```

```text
fs ls [<path>]
    List files

      --accessor="file"          The FS accessor to use
  -l, --[no-]details             Show more verbose info
      --format=jsonl             Output format to use (text,json,jsonl,csv).

Args:
  [<path>]  The path or glob to list
```

###### Examples

```text
velociraptor fs ls "C:\\Windows\\System32\\*.exe"
```
will list all exe files in the System32 folder.

```text
velociraptor fs ls --accessor=reg HKEY_LOCAL_MACHINE/SOFTWARE/*
```
will list all registry keys under HKEY_LOCAL_MACHINE/SOFTWARE.

---

### [ fs cp ]

Equivalent VQL:

```vql
SELECT *
FROM foreach(row={
    SELECT Name, Size, Mode.String AS Mode, Mtime, Data, FullPath
    FROM glob(globs=path, accessor=accessor)
  },
             query={
    SELECT Name, Size, Mode, Mtime, Data,
           upload(file=FullPath, accessor=accessor, name=Name) AS Upload
    FROM scope()
  })
```

```text
fs cp <path> <dumpdir>
    Copy files to a directory.

      --accessor="file"          The FS accessor to use
  -l, --[no-]details             Show more verbose info
      --format=jsonl             Output format to use (text,json,jsonl,csv).

Args:
  <path>     The path or glob to list
  <dumpdir>  The directory to store files at.
```

###### Example: Copy file from the server filestore

```shell
velociraptor --config ./server.config.yaml fs cp -l --accessor=fs "/**/*.msi" ./MSI
```
will copy all `.msi` files from the server filestore to a folder named
`MSI`.


###### Example: Copy a "locked" file on Windows using the raw NTFS accessor

Velociraptor can fall back to raw NTFS parsing when it can not access
a file. We can use the `fs cp` command with the `--accessor` flag to
have Velociraptor copy the file transparently, bypassing local file
locks.

```shell
C:\Windows\System32>c:\velociraptor.exe fs cp c:\Windows\system32\sru\SRUDB.dat c:\output --accessor auto

{"Name":"SRUDB.dat","Size":9568256,"Mode":"-rw-rw-rw-","Mtime":"2026-03-23T05:18:02.2159378Z","Data":{},"Upload":{"Path":"\\\\?\\c:\\output\\SRUDB.dat","Size":9474048,"UploadId":0,"sha256":"33a1c63b6cb863acf7c79e5d7881d09d7834052250502c05145fb95555495b69","md5":"15491bbc80d63d751c8bcb0114458bce","Components":["SRUDB.dat"]}}
```

This does not trigger a new Volume Shadow Copy or require any
3rd-party binaries.

---

### [ fs cat ]

The `cat` subcommand does a normal file read and is unaware of
filestore compression (see note above). To handle the compression you
should use the `fs zcat` command described below.

```text
fs cat <path>
    Dump a file to the terminal

      --accessor="file"          The FS accessor to use
  -l, --[no-]details             Show more verbose info
      --format=jsonl             Output format to use (text,json,jsonl,csv).

Args:
  <path>  The path to cat
```

---

### [ fs zcat ]

```text
fs zcat <chunk_path> <file_path>
    Dump a compressed filestore file

      --accessor="file"          The FS accessor to use
  -l, --[no-]details             Show more verbose info
      --format=jsonl             Output format to use (text,json,jsonl,csv).

Args:
  <chunk_path>  The path to the .chunk index file
  <file_path>   The path to the compressed file to dump
```

Because this command is designed for handling filestore compression,
it defaults to the `fs` accessor and you therefore do not need to
specify it.

###### Example: read a compressed results file

```text
velociraptor fs zcat /data/clients/C.d828d0c753eb0ccd/artifacts/Linux.Sys.BashShell/F.D85A6JHNTSER4.{chunk,json}
```

---

### [ fs rm ]

```text
fs rm <path>
    Remove file (only filestore supported)

      --accessor="file"          The FS accessor to use
  -l, --[no-]details             Show more verbose info
      --format=jsonl             Output format to use (text,json,jsonl,csv).

Args:
  <path>  The path or glob to remove
```

This command is equivalent to running the following VQL:

```vql
SELECT FullPath, Size, Mode.String AS Mode, Mtime, file_store_delete(path=FullPath) AS Deletion
FROM glob(globs=path, accessor=accessor)
```
