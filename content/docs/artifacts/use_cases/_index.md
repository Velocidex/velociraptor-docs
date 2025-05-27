---
menutitle: "Other Use Cases"
title: "Other use cases for artifacts"
date: 2025-01-25
draft: false
weight: 150
summary: "Interesting alternative use cases for artifacts"
last_reviewed: 2025-04-30
---

While you can learn a lot about what artifacts are usually used for by looking
through the hundreds of artifacts that ship with the Velociraptor binary, there
are certainly many more use cases - including ones that nobody has even thought
of yet!

Artifacts are a powerful mechanism for encapsulating information, including but
not limited to VQL.


## Server "Bootstrap" Artifacts

Velociraptor allows us to specify
[startup artifacts]({{< ref "/knowledge_base/tips/startup_artifacts/" >}})
via it's configuration. That
is, instead of using the GUI to configure collection of CLIENT_EVENT and
SERVER_EVENT artifacts, we can preconfigure these via the config.

In addition, we can specify SERVER artifacts which are run when the Velociraptor
server is run for the very first time. This allows artifacts to be created which
serve as "bootstrap" scripts, so that most of the initial configuration can be
automated.


Config settings vs. equivalent VQL functions:

`GUI.initial_users`
`GUI.initial_orgs`
`Frontend.default_server_monitoring_artifacts`
`Frontend.default_client_monitoring_artifacts`
`Frontend.initial_server_artifacts`

VQL functions that can be useful when initializing a new server, which don't have
equivalent config settings:

- create and customize user profiles using `user_create` and `user_options`.
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
  [Windows.Utils.DefenderExclusion]({{< ref "/exchange/artifacts/pages/defenderexclusion/" >}}))

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
about having artifacts with no sources, however this allows for some interesting
use cases.

We have already seen that
[notebook templates]({{< ref "/docs/artifacts/notebook_templates/" >}})
are a special use case for artifact definitions. While notebook templates do
have sources, these contain templates for notebook cells rather than queries.

Artifacts without sources cannot be directly launched via the GUI and are also
filtered out from all the preset
[filter views]({{< ref "/docs/artifacts/gui/#searching-artifacts" >}})
on the Artifacts screen, except for the filter category "Include Empty Sources".
This filter will show all artifacts including those that don't have sources.
This aspect is useful because it means you can define source-free artifacts
without them being collectable, and therefore such artifacts don't clutter
artifact selection lists or confuse users.

#### Export-only artifacts (sharing VQL via export-imports)

An artifact with no sources and an
[export]({{< ref "/docs/artifacts/export_imports/" >}}) section can be used:
  - for defining shared variables or "constants"
  - for defining shared custom functions and plugins

This can help ensure consistency across artifacts and simplify artifacts that
have large sections of generically reusable code. In particular, artifacts that
include binary parser profiles can be difficult to read because you first have
to scroll past the potentially very long profile definition to get to the VQL.
Putting such lengthy blocks into a source-free artifact's export section and
then importing it when needed makes the latter artifact much more user-friendly.

![Reusing VQL can improve artifact legibility](export_reusability.svg)

Ultimately when the _importing_ artifact is collected the imports are resolved
and the compiled artifact is sent to the client which includes the imported VQL,
so there is no saving in terms of network bandwidth. It just improves legibility
and code consistency.

#### Event queues

An artifact with no sources can be used to define server and client event queues

#### Documentation

Artifacts with no sources and only
[informational fields]({{< ref "/docs/artifacts/basic_fields/#informational-fields" >}})
can be used to store internal documentation - perhaps Velociraptor SOPs or other
DFIR-related information that could be useful to the team working on your server.

![artifacts as documentation](artifact_documentation.png)

#### Tool definitions

It is possible to use a single source-free artifact to store all your tool
definitions, which can then be referred to (by only the name and optionally a
version nuber) in other artifacts that use those tools.

In fact Velociraptor does this already with the  built-in
`Server.Internal.ToolDependencies` artifact.

If you define the artifact as a `SERVER` artifact then running it will download
the tools from the URLs specified in the tool definitions. This provides a quick
way to ensure that your server's tools inventory is populated with all the tools
your artifacts will need _before_ you try to collect those artifacts. You can
additionally use such an artifact as one of your
"[bootstrap artifacts]({{< relref "/docs/artifacts/use_cases/#server-bootstrap-artifacts" >}})",
as described above.

