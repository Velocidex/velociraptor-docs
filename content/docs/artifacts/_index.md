---
title: "Artifacts"
date: 2021-06-12T05:20:45Z
draft: false
weight: 30
aliases:
  - "/docs/gui/artifacts/"
  - "/docs/vql/artifacts/"
---

## What are Artifacts?

At it's core Velociraptor is simply a VQL engine . That is, it processes a VQL
query producing a series of rows and sends those rows to the server.

An **Artifact** is a way to package one or more VQL queries and related data in
a human readable YAML file, give it a name, and allow users to collect it. An
Artifact file encapsulates one or more queries to collect data or answer a
specific question about the endpoint.

<!-- Artifacts are YAML files which encapsultate VQL queries in human
readable contextual package. The launcher service is responsible for
compiling artifacts into direct client requests. Clients run direct
VQL statements derived from the artifacts, while users write,
customize, or launch artifacts. -->

Artifacts can be thought of as VQL "modules". By encapsulating a VQL query
inside a YAML file, users do not need to understand the query to use it. This
facilitates knowledge sharing with more experienced users.

### A Basic Example

Usually an artifact is geared towards collecting a single type of information
from the endpoint.

For example consider the following artifact:

```yaml
name: Custom.Artifact.Name
description: |
   This is the human readable description of the artifact.

type: CLIENT

parameters:
   - name: FirstParameter
     default: Default Value of first parameter

precondition: ""

sources:
  - name: MySource
    precondition:
      SELECT OS From info() where OS = 'windows' OR OS = 'linux' OR OS = 'darwin'

    query: |
      SELECT * FROM info()
      LIMIT 10
```

The Artifact contains a number of important YAML fields:

1. **Name**: The artifact contains a name. By convention the name is
   segmented by dots in a hierarchy. The Name appears in the GUI and
   can be searched on.
2. **Description**: Artifacts contain a human readable description. The
   description field is also searchable in the GUI and so should
   contain relevant keywords that make the artifact more discoverable.
3. **Type**: The type of the Artifact. Since Velociraptor uses VQL in many
   different contexts, the type of the artifact hints to the GUI where
   the artifact is meant to run. For example, a CLIENT artifact is
   meant to be run on the endpoint, while a SERVER artifact is meant
   to be run on the server. The artifact type is only relevant for the
   GUI.
4. **Parameters**: An artifact may declare parameters, in which case they
   may be set by the GUI user to customize the artifact collection.
5. **Sources**: The artifact may define a number of VQL sources to
   generate result tables. Each source generates a single table. If
   more than one source is given, they must all have unique names.
6. **Precondition**: A source may define a precondition query. This query
   will be run prior to collecting the source. If it returns no rows
   then the collection will be skipped. Preconditions make it safe to
   collect artifacts from all hosts (e.g. in a hunt), and ensure that
   only artifacts that make sense to collect are actually run.
7. **Query**: The query that will be used to collect that source. Note
   that since each source **must** produce a single table, the query
   should have exactly one `SELECT` clause and it must be at the end
   of the query potentially following any `LET` queries.

### A More Advanced Example

Let's take a look at a typical artifact `Windows.Detection.Mutants`.

![Mutants artifact](mutants.svg)

This artifact uncovers the mutants (named mutexes) on a system, using
two methods. First we enumerate all handles, and check which process
is holding a handle to a mutant object. Alternatively we enumerate the
kernel object manager to receive the same information.

Therefore this artifact contains two sources - each gets similar
information in a different way. A user who is just interested in
listing the Mutants on an endpoint would probably need to see both
results.

We also see some parameters declared to allow a user to filter by
process name or mutant name.


{{% notice info "Compiling artifacts into VQL requests" %}}

When collecting an artifact from the client, the server **compiles**
the artifact and it's dependencies into raw VQL statements and sends
these to the client for evaluation. We never rely on the artifact
definitions embedded in the client itself - instead we always send the
compiled VQL to the client. This allows us to upgrade artifact
definitions on the server without needing to update the client itself.

{{% /notice %}}

The pages in this section explain the key concepts for creating and using
Velociraptor artifacts.

{{% children %}}
