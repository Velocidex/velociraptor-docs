---
menutitle: "Run mode"
title: "Running collections on the command line"
date: 2026-06-16
last_reviewed: 2026-06-17
draft: false
weight: 30
summary: |
  Run mode (-r or --run flag) provides a simpler syntax for running
  Velociraptor collections on your local machine, a remote server, or
  remote clients.
description: |
  Run mode (-r or --run flag) provides a simpler syntax for running
  Velociraptor collections on your local machine, a remote server, or
  remote clients.
---

Run mode (`-r` or `--run` flag) lets you run any Velociraptor
collection directly from the command line, whether locally or against
a remote server and its clients. It provides a simpler and more
intuitive syntax than the equivalent `artifacts collect` command,
especially when passing parameters to artifacts.

## Equivalence to artifacts collect

Run mode is a front-end to `artifacts collect`. The following two
commands are equivalent:

```sh
velociraptor -r Windows.Forensics.SRUM --SRUMLocation /tmp/srudb.dat
```

```sh
velociraptor artifacts collect Windows.Forensics.SRUM --args SRUMLocation=/tmp/srudb.dat
```

Instead of wrapping parameters in `--args Key=Value` syntax, you pass
them directly as flags:

```text
velociraptor [global flags] -r <ArtifactName> [artifact parameters...]
```

Because run mode uses `artifacts collect` under the hood, it supports
all the
[flags for that command](/docs/cli/commands/artifacts/#-artifacts-collect-).

## Global flags vs artifact parameters

[Global CLI flags](/docs/cli/flags/)
(such as `--config` or `--api_config`) go **before** the `-r` flag.
Flags after the `-r` flag are passed as parameters to the artifact
unless they are flags expected by the `artifacts collect` command.

For example, the following command runs the `Windows.Forensics.SRUM`
artifact with a custom `--output` and saves the results to a ZIP file:

```sh
velociraptor -r Windows.Forensics.SRUM -o /tmp/srum_results.zip
```

Here `-o` maps to the `--output` flag of `artifacts collect`.

## Viewing artifact parameters

Use `-h` after the artifact name to see the artifact's specific
parameters instead of the CLI help:

```sh
velociraptor -r <Artifact.Name> -h
```

###### Example

```shell
> c:\velociraptor.exe -r Windows.Forensics.SRUM -h
...
Artifact Parameters:
 --SRUMLocation
   default: 'c:/windows/system32/sru/srudb.dat'
...
 --Upload [bool]
   Select to Upload the SRUM database file 'srudb.dat'

    Valid values: Y / N
```

## Using custom artifact definitions

You can load custom artifact packs with the `--definitions` flag.
Place this flag **before** `-r`:

```sh
velociraptor --definitions /path/to/artifacts.zip -r Custom.MyArtifact
```

The `--definitions` flag also accepts a ZIP file containing artifact
definitions.

## Remote collection via the API

With an API config file (`--api_config`), run mode works against a
remote server. You can collect server artifacts or collect client
artifacts from any client. 

###### Example: Collect a server artifact

```sh
velociraptor --api_config api.yaml \
    -r Server.Utils.ListUsers -o /tmp/gui_users.zip --password "H4RDp@$$wOrd"
```

###### Example: Collect an artifact from a specific client

```sh
velociraptor --api_config api.yaml \
    -r Windows.Forensics.Lnk -o /tmp/lnk.zip \
    --client_id C.9e12b994f5c41ab6
```


Run mode via the API (and `artifacts collect`) schedules a normal
collection, but runs synchronously. So if the client is offline the
collection will be scheduled and the `--run` command will wait for
results. You can `CTRL+C` to terminate the command and the collection
will remain scheduled for the remote client. You can later run queries
or artifacts to enumerate collections for the client and then download
them using `artifacts fetch` command.

###### Example

To download the results of a previously run collection from the
server, use the `artifacts fetch` command with the flow ID:

```sh
velociraptor --api_config api.yaml artifacts fetch \
    --flow_id F.D6JCVA49O524O \
    --output /tmp/results.zip
```

See the [[ artifacts fetch ]](/docs/cli/commands/artifacts/#-artifacts-fetch-)
reference for details.

## Detailed walkthrough

For a detailed walkthrough covering local collection, remote
collection via the API, custom artifact packs, external tool
integration, and server management tasks, see the
[CLI blog post](/blog/2026/2026-03-21-cli/).
