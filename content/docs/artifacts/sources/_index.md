---
menutitle: "Sources"
title: "Artifact Sources"
date: 2025-01-25
draft: false
weight: 20
summary: "blah blah blah"
last_reviewed: 2025-04-30
---

This section will cover artifact sources.

## Named sources

## Notebook cell templates

<!-- ## Sources

An artifact may contains several sources. Each source represents a
single SELECT query and potentially multiple LET queries. Ultimately
each source returns a single table of results. If an artifact wishes
to return multiple tables, it should define multiple sources.

It is sometimes useful to run multiple sources in the same
scope. This allows for example a result set to be calculated in the
first source, then presented in the second source, or be the basis
of further calculation in the third source. Thereby returning a
series of related tables. We call this mode of execution "Serial
Mode" since in this mode, source1 will be collected, then source 2
etc in the same client request.

Similarly for event plugins, it is impossible to run in serial mode
because each source never terminates. Therefore event artifacts
(SERVER_EVENT, CLIENT_EVENT) produce multiple independent requests
from the client. We call this "Parallel mode" as each request is
independent and runs in parallel.

The most important distinction from the artifacts writer's POV is
that serial mode reuses the scope between sources, while parallel
mode uses a new scope for each source.

```yaml
name: MultiSourceSerialMode
sources:
- name: Source1
query: |
    LET X <= SELECT ....
    SELECT ...
- name: Source2
query: |
    SELECT * FROM X
```

Consider the above artifact which will run serially - First Source1
and then Source2 in the same request. Therefore Source2 can see any
queries or results defined in Source1. -->
