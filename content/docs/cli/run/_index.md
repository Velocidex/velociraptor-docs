---
menutitle: "Run mode"
title: "Running collections on the command line"
date: 2026-06-16
last_reviewed: 2026-06-16
draft: false
weight: 30
summary: |
  Run mode (-r or --run flag) lets you run any Velociraptor collection
  directly from the command line.
description: |
  Run mode (-r or --run flag) lets you run any Velociraptor collection
  directly from the command line.
---

You can run Velociraptor artifacts directly from the command line
using **run mode** (`-r` or `--run` flag). This turns any artifact
into a standalone CLI tool without the standard
`artifacts collect` subcommand syntax. The `-r` flag transforms the
command line into the equivalent of `artifacts collect` behind the
scenes.

## Basic syntax

```text
velociraptor [global flags] -r <ArtifactName> [artifact parameters...]
```

## Global flags vs artifact parameters

Global CLI flags (such as `--config` or `--api_config`) go **before**
the `-r` flag. Flags after the `-r` flag are passed as parameters to
the artifact.

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
velociraptor -r Windows.Forensics.SRUM -h
```

## Using custom artifact definitions

You can load custom artifact packs with the `--definitions` flag.
Place this flag before `-r`:

```sh
velociraptor --definitions /path/to/artifacts.zip -r Custom.MyArtifact
```

The `--definitions` flag also accepts a ZIP file containing artifact
definitions.

## Remote collection via the API

With an API config file, the `-r` syntax works against a remote server
and can collect artifacts from clients:

```sh
velociraptor --api_config api.yaml -r Windows.Forensics.Lnk -o lnk.zip
```

To download the results of a collection that has already completed,
use the `artifacts fetch` command with the flow ID:

```sh
velociraptor --api_config api.yaml artifacts fetch \
    --flow_id F.D6JCVA49O524O \
    --output /tmp/results.zip
```

See the [[ artifacts fetch ]](/docs/cli/commands/artifacts/#-artifacts-fetch-)
reference for details.

## Detailed walkthrough

For a full walkthrough covering local collection, remote collection
via the API, custom artifact packs, external tool integration, and
server management tasks, see the
[CLI blog post](/blog/2026/2026-03-21-cli/).
