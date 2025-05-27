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
is, instead of using the GUI to configure the collection of CLIENT_EVENT and
SERVER_EVENT artifacts, we can preconfigure these via the config.

The config settings which allow this are:

- `Frontend.default_server_monitoring_artifacts`: specifies the initial client
  monitoring table that will be created. By default, Velociraptor collects
  endpoint CPU and Memory telemetry from all endpoints. You can remove this, or
  specify a different client artifact to collect.
- `Frontend.default_client_monitoring_artifacts`: specifies an initial set of
  server event artifacts to collect.

We can also define users and orgs that will be created when the server is first
run, using the following config settings:

- `GUI.initial_users`
- `GUI.initial_orgs`

While this may be sufficient for some server setup situations, we may want to
automate many other things during setup, so that we don't have to rely on manual
configuration via the GUI. This flexibility is provided by the config setting
`Frontend.initial_server_artifacts`, which allows us to specify one or more
SERVER type artifacts that will be run when the Velociraptor server is started
for the very first time. The server detects that it is being run for the first
time by checking for the presence of the file `config/install_time.json.db` in
the datastore: if the file is not found then the server assumes it's the first
time it is being run.

Since the `initial_server_artifacts` setting allows us to run server artifacts,
this gives us access to the full capabilities of VQL in setting up the server.
There are many VQL functions that can be useful when initializing a new server,
which don't have equivalent config settings.

We could, for example:

- create users _and_ customize user profiles using the `user_create` and
  `user_options` functions.
- create and start [hunts]({{< ref "/docs/hunting/" >}}) using the `hunt_add`
  function.
- create [notebooks]({{< ref "/docs/notebooks/" >}}) using the `notebook_create`
  function (based on custom notebook templates).
- run [server artifacts which import other artifacts]({{< ref "/docs/gui/artifacts/#importing-artifacts-using-server-artifacts" >}})
- run [artifacts which define and download tools]({{< relref "#tool-definitions" >}})
  to the server's tool inventory, or we could add/update tools using VQL's
  `inventory_add` and `inventory_get` functions.

Because we can specify multiple SERVER artifacts in the
`initial_server_artifacts` setting, we might choose to have one artifact that
addresses each area of server initialization, or we could have one larger
"bootstrap" artifact that does everything we want.

These artifacts are just normal server artifacts which can be developed and
tested by running them in the "Server Artifacts" screen in the GUI (obviously on
a non-production/development server!).

These initial server artifacts can also call other artifacts (built-in or
custom) to aid in the setup process. Custom artifacts, as well as the
"bootstrap" artifacts themselves, can be
[embedded in the config or loaded from a folder]({{< ref "/docs/artifacts/#loading-importing-and-saving-artifacts" >}}).


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
Because client artifacts are normally delivered from the server -- and in this
case the client might not have enrolled with the server yet -- this setting
requires the artifacts to be included in the client config's
`autoexec.artifact_definitions` section.

If these artifacts are run before enrollment then the data produced will be
queued and delivered to the server after enrollment, as event queries.

## Source-free Artifacts

Artifacts can have ZERO or more sources. It may seem strange at first to think
about having artifacts with no sources, however this allows for some interesting
use cases.

We have already seen that
[notebook templates]({{< ref "/docs/artifacts/notebook_templates/" >}})
are a special use case for artifact definitions. While notebook templates do
have sources, these contain templates for notebook cells rather than queries.

Furthermore, if you've spent any time looking through the list of built-in
artifacts, you may have noticed several that have little to nothing but an
artifact name. The purpose of such artifacts is to establish
[event queues]({{< ref "/docs/artifacts/event_queues/" >}})
on the server, which intercept and queue messages from clients and from the
server itself. These artifacts _can_ have sources, which would typically do
something with the event messages, but they aren't required to have sources (for
example, other artifacts may be created to act on the event queue's messages).

![Server.Internal.ClientDelete establishes a server event queue](event_queues_01.svg)

![That's all it contains](event_queues_02.png)

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

An artifact with no sources can be used to define server and client
[event queues]({{< ref "/docs/artifacts/event_queues/" >}}).

These may have sources, but can still be useful without them, as demonstrated by
the `Server.Internal.ClientDelete` artifact shown above.

#### Documentation

Artifacts with no sources and only
[informational fields]({{< ref "/docs/artifacts/basic_fields/#informational-fields" >}})
can be used to store internal documentation; particularly since the
`description` field supports Markdown and is searchable in the GUI.

You could perhaps use it to store Velociraptor SOP documentation or other
DFIR-related information that could be useful to the team working on your
server.

As mentioned above, artifacts without sources cannot be directly launched via
the GUI and are also filtered out from all the preset filter views on the
Artifacts screen, which means that you can create such artifacts without them
being collectable, and without them appearing on artifact selection lists where
they might confuse users.

![Artifacts as documentation](artifact_documentation.png)

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

