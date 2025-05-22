---
menutitle: "Novel Use Cases"
title: "Novel use cases for artifacts"
date: 2025-01-25
draft: false
weight: 120
summary: "Interesting alternative use cases for artifacts"
last_reviewed: 2025-04-30
---

While you can learn a lot about what artifacts are usually used for just by
looking through the hundreds of artifacts that ship with the Velociraptor
binary, there are infinitely many more use cases, including ones that nobody has
even thought of yet!

Artifacts are a powerful mechanism for



## Server "Bootstrap" Artifacts

https://docs.velociraptor.app/knowledge_base/tips/startup_artifacts/

Config settings vs. equivalent VQL functions:

`GUI.initial_users`
`GUI.initial_orgs`
`Frontend.default_server_monitoring_artifacts`
`Frontend.default_client_monitoring_artifacts`
`Frontend.initial_server_artifacts`

VQL functions that can be useful when initializing a new server, which don't have
equivalent config settings:

- [hunt_add()](): to create and start hunts
- create notebooks
- run [server artifacts which import other artifacts]({{< ref "/docs/gui/artifacts/#importing-artifacts-using-server-artifacts" >}})

## Running artifacts on client startup

Sometimes we may want the client to do something very early on, as soon as it
starts and potentially even before client enrollment.

Such startup tasks could be, for example:

- copying a file from the network
- cleaning up some old files
- setting up or starting a VPN client (perhaps to enable the client to connect
  to the server)
- adding an anti-malware exclusion (see for example
  https://docs.velociraptor.app/exchange/artifacts/pages/defenderexclusion/)

The `Client.additional_event_artifacts` configuration item allows us to do this
by specifying artifacts that should run when the client starts. Although these
artifacts are run as event artifacts (never expected to terminate), they can
contain any valid client-side VQL.

These artifacts will run every time the client starts, even before enrollment.
Because artifacts are usually delivered from the server, and in this case the
client might not have enrolled with the server yet, it requires the artifacts to
be included in the client config's `autoexec.artifact_definitions` section.

If these artifacts run before enrollment then the data produced will be queued
and delivered to the server after enrollment, as event queries.

## Source-free Artifacts

Artifacts can have ZERO or more sources. It may seem strange at first to think
about artifact with no sources, however this allows for some interesting use
cases, for example:
- export-imports
    - for defining shared variables
    - for defining shared custom functions and plugins
    - for defining shared parameter values (because parameters are really predefined variables)
- defining server (and client?) event queues
- documentation (using description-only artifacts)
- storing tool definitions (which can then either be launched as a server artifact)

Artifacts without sources cannot be directly launched via the GUI and are also
filtered out from all preset filter views on the Artifacts screen, except for
the filter category "Include Empty Sources". This filter will show all artifacts
including those that don't have sources.