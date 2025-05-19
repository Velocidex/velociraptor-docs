---
menutitle: "Novel Use Cases"
title: "Novel use cases for artifacts"
date: 2025-01-25
draft: false
weight: 120
summary: "Interesting alternative use cases for artifacts"
last_reviewed: 2025-04-30
---

## Using server artifacts for server automation

### Server "Bootstrap" Artifacts

Config settings vs. equivalent VQL functions:

`GUI.initial_users`
`GUI.initial_orgs`
`Frontend.default_server_monitoring_artifacts`
`Frontend.default_client_monitoring_artifacts`
`Frontend.initial_server_artifacts`

VQL functions that can be useful initialize a new server, which don't have
equivalent config settings:

- [hunt_add()](): to create hunts
- create notebooks

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