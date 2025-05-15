---
menutitle: "Novel Use Cases"
title: "Novel Use Cases"
date: 2025-01-25
draft: false
weight: 120
summary: "Interesting alternative use cases for artifacts"
last_reviewed: 2025-04-30
---

## Using server artifacts for server automation

### Server Bootstrap Artifacts

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