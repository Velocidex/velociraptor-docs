---
menutitle: "tools"
title: 'The "tools" command group'
date: 2025-05-20
last_reviewed: 2025-07-06
draft: false
weight: 90
summary: "Commands for working with the tools inventory."
---

The following CLI commands are available for working with third-party binaries
and files in the server's
[tools inventory]({{< ref "/docs/artifacts/tools/" >}}).

{{% notice warning %}}

Changes made using this CLI command will not be effective until the server is
restarted!

To add or modify tools during runtime you should instead use the `inventory`,
`inventory_add`, or `inventory_get` [VQL functions]({{< ref "/vql_reference/"
>}}).

{{% /notice %}}

Because these commands work with the server's tools inventory, they need access
to the server's datastore and therefore need the `server.config.yaml` in order
to find the datastore. This means that these commands all need to be run with
the `--config` (or `-c`) flag.

---

### [ tools show ]

```text
tools show [<file>]
    Shows tools in the inventory

Args:
  [<file>]  Tool name to show
```

##### Examples

```text
velociraptor --config server.config.yaml tools show
```
shows information about all tools in the inventory.

```text
velociraptor --config server.config.yaml tools show "VelociraptorWindowsMSI"
```
shows information about the tool registered under the name
"VelociraptorWindowsMSI".

---

### [ tools rm ]

```text
tools rm <name>
    Remove a third-party tool

Args:
  <name>  Tool name to remove
```

---

### [ tools upload ]

```text
tools upload --name=NAME [<flags>] [<path>]
    Upload a third-party tool

    --name=NAME                  Name of the tool
    --tool_version=TOOL_VERSION  The version of the tool
    --filename=FILENAME          Name of the tool executable on the endpoint
    --github_project=GITHUB_PROJECT
                                 Fetch the tool for github releases
    --github_asset=GITHUB_ASSET  A regular expression to match the release asset
    --[no-]serve_remote          If set serve the file from the original URL
    --[no-]download              Force immediate download if set, default - lazy download on demand

Args:
  [<path>]  Path to file or a URL
```