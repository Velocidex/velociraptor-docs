---
menutitle: "Miscellaneous"
title: "Miscellaneous commands"
date: 2025-05-20
last_reviewed: 2025-07-06
draft: false
weight: 120
summary: All other commands not previously covered.
---

All other commands not previously covered.

---

### [ client ]

```text
client [<flags>]
    Run the velociraptor client

    --[no-]quiet          Do not output anything to stdout/stderr
    --[no-]require_admin  Ensure the user is an admin
```

---

### [ csv ]

```text
csv [<flags>] <files>...
    Convert a CSV file to another format

    --where=WHERE   A WHERE condition for the query
    --format=jsonl  Output format

Args:
  <files>  CSV files to parse
```

----


### [ debian ]

```text
debian server [<flags>]
    Create a server package from a server config file.

    --output=OUTPUT  Output directory where package files will be written
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
    --[no-]disable-panic-guard  Disables the panic guard mechanism (not recommended)
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

Args:
  <directory>  Golden file directory path
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

For more information, see
[Deployment > Instant Velociraptor]({{< ref "/docs/deployment/#instant-velociraptor" >}}).

----

### [ hunts reconstruct ]

```text
hunts reconstruct
    Reconstruct all hunt objects from logs
```

This command aims to recover lost hunts, which may occur in unusual situations
like the disk filling up unexpectedly, although its effectiveness depends on the
completeness of the audit logs. If the audit logs themselves were corrupted or
truncated, full recovery might not be possible using this method alone.

In recent releases (0.7.0+), the way hunt data is stored has been changed (e.g.
using a single snapshot file instead of many individual files) and disk space
checks are performed before writing. This is intended to reduce the corruption
occurring which would then necessitate use of this command. In version 0.7.0 and
later, the command will rebuild corrupted hunts into a `/recovery/...` directory
requiring manual movement of files after recovery.

The command can be run while the server is running or stopped.

##### Example

```sh
# first change to the velociraptor user to avoid messing up the datastore's filesystem ACLs
sudo -u velociraptor bash
velociraptor hunts reconstruct --config /path/to/server.config.yaml
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

### [ rpm ]

```text
rpm client [<flags>]
    Create a client package from a server config file.

    --output=OUTPUT  Output directory where package files will be written
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

Args:
  <file>       Zip file to parse
  [<members>]  Members glob to extract
```

#### Notes

- If the zip files are secured with the server's X509 certificate then you need
  to provide the config to the command using the `--config` flag so that it can
  access the secured archive. Otherwise you will see the error
  "GetPrivateKeyFromScope: No frontend configuration given" logged in the
  terminal.

- See also [[ fuse container ]]({{< ref "/docs/cli/fuse/" >}}), which
  allows you to mount collection zips instead of extracting them.

----

### [ version ]

```text
version
    Report the binary version and build information.
```
