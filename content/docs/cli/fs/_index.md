---
menutitle: "fs (filesystem)"
title: 'The "fs" command group'
date: 2025-05-20
draft: false
weight: 60
summary: Run filesystem commands.
---

These utility commands allow you to run filesystem commands on the local system,
including "filesystem-like" formats, or against the Velociraptor server's
filestore. They do this by exposing some VQL queries as CLI commands.

The commands use Velociraptor's [accessors]({{< ref "/vql_reference/accessors/" >}}).

The supported accessors for the `fs` commands are:

- file (default accessor)
- ntfs
- reg | registry
- raw_reg
- zip
- lazy_ntfs
- file_links
- fs (a Velociraptor filestore)

Paths must be absolute paths. Glob patterns can be used.

The default output format is jsonl.

When using the `fs` accessor, it needs to connect to the server's datastore and
therefore needs the server.config.yaml so that it knows where to find the
datastore. This means that such commands need to be run with the `--config`
(or `-c`) flag.

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

**Examples:**

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

**Example:**

```text
velociraptor --config ./server.config.yaml fs cp -l --accessor=fs "/**/*.msi" ../MSI
```
will copy msi files from the server filestore to a folder named MSI.

---

### [ fs cat ]

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

### [ fs rm ]

Equivalent VQL:

```vql
SELECT FullPath, Size, Mode.String AS Mode, Mtime, file_store_delete(path=FullPath) AS Deletion
FROM glob(globs=path, accessor=accessor)
```

```text
fs rm <path>
    Remove file (only filestore supported)
      --accessor="file"          The FS accessor to use
  -l, --[no-]details             Show more verbose info
      --format=jsonl             Output format to use (text,json,jsonl,csv).

Args:
  <path>  The path or glob to remove
```
