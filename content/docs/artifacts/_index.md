---
menutitle: "Artifacts"
title: "Velociraptor Artifacts"
date: 2021-06-12T05:20:45Z
draft: false
weight: 30
aliases:
  - "/docs/vql/artifacts/"
#   - "/docs/gui/artifacts/"
---

Velociraptor Artifacts are a key component of the platform, providing numerous
benefits for digital forensics and incident response workflows.


## What are Artifacts?

At it's core Velociraptor is simply a VQL engine . It processes a VQL query
producing a series of rows and sends those rows to the server.

Artifacts allow us to package one or more VQL queries and related data into a
human-readable [YAML](https://www.tutorialspoint.com/yaml/yaml_basics.htm) file
which is stored within the Velociraptor server's datastore.

Artifacts are intended to be self-documenting through good descriptions and
well-structured VQL. This allows other users to collect specific information
from endpoints without necessarily needing to understand or remember the queries
and related data encapsulated in the artifact. This approach facilitates
knowledge sharing between users with varying skill levels, within the
Velociraptor community, and the broader DFIR community.

Artifacts can also be directly used within other VQL queries.

Here is the basic structure of a simple artifact:

![Artifacts are YAML but they can contain VQL](artifact_concept.svg)

{{% notice note %}}

Don't confuse Velociraptor Artifacts with forensic artifacts! Although they are
historically somewhat related, and there is also a correspondence in the sense
that Velociraptor Artifacts usually (but don't have to) target specific
information sources on endpoints which are traditionally described as
["forensic artifacts"](https://github.com/ForensicArtifacts).

{{% /notice %}}

## Why use Artifacts instead of just running VQL queries directly?

In Velociraptor all VQL queries are packaged in Artifacts. VQL cannot be run
directly on clients, with the exception of the standalone
[CLI `query` command]({{< ref "/docs/deployment/#command-line-investigation-tool" >}}).
In client-server mode, VQL queries are always delivered to the client in the
form of artifacts.

When performing a collection against a client, the server _compiles_ the
artifact and it's dependencies into raw VQL statements and sends these to the
client for evaluation. The compiled artifacts do not include comments and
informational fields (such as author, description, or references) since these
server no purpose on the client. We never rely on the artifact definitions
embedded in the client itself - instead we always send the compiled VQL to the
client.

Artifacts are stored and managed on the server. This allows us to centrally
upgrade, customize, or add new artifact definitions without needing to update
the clients.

Here are some of the key benefits of Velociraptor Artifacts:

- **Encapsulation and Reusability**: \
  Artifacts bundle VQL statements and related configurations into a single,
  reusable unit. Once an artifact is written, the user does not need to remember
  or re-enter the query. Artifacts can be
  [called from other VQL queries]({{< ref "/docs/artifacts/calling_artifacts/" >}})
  as if they were [standard plugins]({{< ref "/vql_reference/" >}}),
  encouraging the development of reusable components that can be combined like
  Lego bricks.

- **Sharing and Community Collaboration**: \
  By encapsulating one or more queries VQL query inside a YAML file, users do
  not need to understand the query to use it. This facilitates knowledge sharing
  between users with varying skill levels, as well as documenting and sharing
  knowledge about forensic evidence amongst experts.
  Platforms like the [Velociraptor Artifact Exchange]({{< ref "/exchange/">}})
  exist for this purpose, promoting knowledge sharing and code reusability
  within the Velociraptor and broader DFIR community.

- **Extending Velociraptor Functionality**: \
  Artifacts offer a powerful way to extend Velociraptor's capabilities. They can
  wrap external tools like PowerShell scripts or other binaries, thus making
  them callable through VQL. This allows us to rapidly add new features and
  adapt to different systems or file formats rapidly, without requiring source
  code changes, rebuilding, or redeploying the Velociraptor client or server
  binaries.

- **Discoverability and Ease of Use**: \
  Artifacts abstract the underlying complexity, allowing users to run powerful
  queries or external tools simply by calling the artifact by name, often with
  configurable parameters. Artifacts that have clear names and descriptions are
  easier to find within the GUI, and easier for other users to understand. The
  Artifact collection and Hunt creation workflows provides a user-friendly
  interface to find, view and launch them.

- **Targeted and Efficient Collection**: \
  While artifacts can collect files, they are central to Velociraptor's
  philosophy of performing processing directly on the endpoint and returning
  only targeted, high-value results, rather than collecting bulk data for
  offline analysis. This distributed processing approach contributes
  significantly to Velociraptor's scalability.

- **Parameterization**: \
  Artifacts can declare parameters, allowing users to customize how the
  underlying VQL query runs directly from the GUI or when called from other VQL.

- **Operational Safety and Standardization**: \
  Artifact sources can define preconditions – VQL queries that run first to
  determine if the main query is relevant or safe to execute on a specific
  endpoint. If the precondition returns no rows, the source's collection is
  skipped. This makes it safe to deploy hunts involving numerous diverse
  artifacts across an entire fleet. In addition, artifacts serve as a
  foundational unit for testing and quality assurance.

- **Integration of External Tools**: \
  Artifacts provide a structured way to declare dependencies on external
  binaries. Velociraptor handles the logic to ensure these tools are uploaded to
  the endpoint, updated when necessary, and cached for efficiency.

- **Support for Dead Disk Analysis**: \
  Artifacts written for live endpoint analysis can often be reused without
  modification to analyze dead disk images by utilizing Velociraptor's accessor
  remapping feature. This allows leveraging the same powerful analysis logic in
  different contexts.

- **Modular Workflow Creation**: \
  By encapsulating VQL queries, artifacts serve as building blocks that can be
  combined to create custom incident response workflows directly using VQL on
  the server.

### A Simple Example

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

Let's take a look at a typical artifact named `Windows.Detection.Mutants`.

![Mutants artifact](mutants.svg)

This artifact uncovers the mutants (a.k.a mutexes) on a system, using
two methods:
- First we enumerate all handles, and check which process is holding a handle to
  a mutant object.
- Alternatively we enumerate the kernel object manager to receive the same
  information.

Therefore this artifact contains two sources - each gets similar
information in a different way. A user who is just interested in
listing the Mutants on an endpoint would probably need to see both
results.

We also see some parameters declared to allow a user to filter by
process name or mutant name.


## Saving, loading, and importing artifacts

for the root org's artifact repository:
datastore/artifact_definitions

for other orgs, each org has their own artifact repository:
/datastore1/orgs/OQRA0/artifact_definitions


--definitions

included in config: artifacts defined in the `autoexec.artifact_definitions` section


### Built-in vs. Custom Artifacts


### Custom overrides



The pages in this section explain the key concepts for creating and using
Velociraptor artifacts.

{{% children description="true" %}}
