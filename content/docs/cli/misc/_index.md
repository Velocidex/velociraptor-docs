---
menutitle: "Miscellaneous"
title: "Miscellaneous commands"
date: 2025-05-20
draft: false
weight: 120
summary: All other commands not previously covered.
---

All other commands not previously covered.

#### [ client ]

```text
client [<flags>]
    Run the velociraptor client

    --[no-]quiet          Do not output anything to stdout/stderr
    --[no-]require_admin  Ensure the user is an admin

csv [<flags>] <files>...
    Convert a CSV file to another format

    --where=WHERE   A WHERE condition for the query
    --format=jsonl  Output format
```

----



### [ debian ]

```text
debian server [<flags>]
    Create a server package from a server config file.

    --output=OUTPUT  Filename to output
    --binary=BINARY  The binary to package
```

```text
debian client [<flags>]
    Create a client package from a client config file.

    --output=OUTPUT  Filename to output
    --binary=BINARY  The binary to package
```

----

### [ frontend ]

```text
frontend [<flags>]
    Run the frontend and GUI.

    --[no-]disable_artifact_compression
                                Disables artifact compressions
    --[no-]minion               This is a minion frontend
    --node=NODE                 The name of a minion - selects from available frontend configurations (DEPRECATED: ignored)
    --[no-]disable-panic-guard  Disabled the panic guard mechanism (not recommended)
```

----

### [ fuse ]

```text
fuse container [<flags>] <directory> <files>...
    Mount ZIP containers over fuse

    --tmpdir=TMPDIR            A temporary directory to use (if not specified we use our own tempdir)
    --[no-]map_device_names_to_letters
                               Convert raw device names to drive letters
    --[no-]strip_colons_on_drive_letters
                               Remove the : on drive letters
    --[no-]unix_path_escaping  If set we escape only few characters in file names otherwise escape windows compatible chars
    --[no-]emulate_timestamps  If set emulate timestamps for common artifacts like Windows.KapeFiles.Targets.
```

----

### [ golden ]

```text
golden [<flags>] <directory>
    Run tests and compare against golden files.

    --filter=FILTER          A regex to filter the test files
    --env=ENV ...            Environment for the query.
    --[no-]testonly          Do not update the fixture.
    --[no-]disable_alarm     Do not terminate when deadlocked.
    --[no-]update_datastore  Normally golden tests run with the readonly datastore so as not to change the fixture. This flag allows updates to the fixtures.
```

----

### [ gui ]

```text
gui [<flags>]
    Bring up a lazy GUI.

    --datastore=DATASTORE  Path to a datastore directory (defaults to temp)
    --[no-]nobrowser       Do not bring up the browser
    --[no-]noclient        Do not bring up a client
```

----

### [ hunts reconstruct ]

```text
hunts reconstruct
    Reconstruct all hunt objects from logs
```

----

### [ pool_client ]

```text
pool_client [<flags>]
    Run a pool client for load testing.

    --number=NUMBER    Total number of clients to run.
    --writeback_dir=.  The directory to store all writebacks.
    --concurrency=10   How many real queries to run.
    --start_rate=20    How many clients per second to start.
```

----

### query

```text
query [<flags>] <queries>...
    Run a VQL query

    -f, --[no-]from_files  Args are actually file names which will contain the VQL query
        --timeout=0        Time collection out after this many seconds.
        --org="root"       The Org ID to target with this query
        --cpu_limit=0      A number between 0 to 100 representing maximum CPU utilization.
        --format=json      Output format to use (text,json,csv,jsonl).
        --dump_dir=""      Directory to dump output files.
        --output=""        A file to store the output.
        --env=ENV ...      Environment for the query.
        --scope_file=""    Load scope from here. Creates a new file if file not found
        --[no-]do_not_update_scope_file
                           Do not update the scope file with the new scope
```

----

### [ rpm ]

```text
rpm client [<flags>]
    Create a client package from a server config file.

    --output=OUTPUT  Filename to output
    --binary=BINARY  The binary to package
```

```text
rpm server [<flags>]
    Create a server package from a server config file.

    --output=OUTPUT  Filename to output
    --binary=BINARY  The binary to package
```

----

### [ unzip ]

```text
unzip [<flags>] <file> [<members>]
    Unzip a container file

        --[no-]report_password  Log the X509 session password
        --where=WHERE           A WHERE condition for the query
        --dump_dir="."          Directory to dump output files.
        --format=json           Output format for csv output
    -l, --[no-]list             List files in the zip
    -p, --[no-]print            Dump out the files in the zip
```

----

### [ version ]

```text
version
    Report the binary version and build information.
```


