---
menutitle: "Sources"
title: "Artifact Sources"
date: 2025-01-25
draft: false
weight: 30
summary: "Sources describe how the artifact produces data"
last_reviewed: 2025-06-13
---

Sources describe how the artifact produces data.

An artifact may contain several sources. Each source represents a single
`SELECT` query and potentially multiple `LET` queries. Ultimately each source
returns a single table of results. If an artifact wishes to return multiple
tables, it should define multiple sources.

It is sometimes useful to run multiple sources in the same scope. This allows
for example a result set to be calculated in the first source, then presented to
the second source, or be the basis of further calculation in the third source.
Thereby returning a series of related tables. We call this mode of execution
"Serial Mode" since in this mode, source1 will be collected, then source2 etc.,
within the same client request.

For event plugins, it is impossible to run in serial mode because each source
never terminates. Therefore event artifacts (`SERVER_EVENT` or `CLIENT_EVENT`)
produce multiple independent requests from the client. We call this "Parallel
mode" as each request is independent and runs in parallel.

The execution mode for non-event artifacts is determined by the presence of
source-level preconditions, and is explained in greater detail
[here]({{< ref "/docs/artifacts/preconditions/#serial-vs-parallel-execution" >}}).

The most important distinction from the artifacts writer's point of view is that
serial mode reuses the scope between sources, while parallel mode uses a new
scope for each source.

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

Consider the above artifact which will run serially: First Source1 will run and
then Source2, both in the same request and same scope. Therefore Source2 can see
any queries defined in Source1 and any results from Source1.

<!-- ## Named sources

[How does it work when you have multiple unnamed sources?]

## Notebook cell templates

message NotebookSourceCell {
    string template = 1;
    string type = 2;
    string name = 4;
    string output = 5;
    repeated ArtifactEnv env = 3; -->





