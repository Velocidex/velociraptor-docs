---
menutitle: "Sourceless Artifacts"
title: "Sourceless Artifacts"
date: 2025-01-25
draft: false
weight: 70
summary: "Interesting use cases for artifacts"
last_reviewed: 2025-04-30
---

## Using server artifacts for server automation

### Server Bootstrap Artifacts

## Source-free Artifacts

Artifacts can have ZERO or more sources.
It may seem strange at first to think about artifact with no sources, however this allows for some interesting use cases, for example:
- export-imports
    - shared variables
    - shared custom functions and plugins
    - shared parameter values (because parameters are really preset variables)
- defining server event queues
- documentation (using description-only artifacts)
- storing tool definitions