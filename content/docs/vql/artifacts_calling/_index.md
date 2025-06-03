---
title: "Calling artifacts from VQL"
menutitle: "Calling Artifacts"
date: 2025-05-13
draft: false
weight: 50
summary: "How to call artifacts from VQL"
last_reviewed: 2025-05-28
---

In Velociraptor, artifacts encapsulate VQL queries, making them reusable and
shareable. A key feature is the ability to call one artifact from within the VQL
of another artifact. This allows for building modular and composable
collections.

Artifacts can be called directly from other VQL queries as if they were a
VQL plugin. This allows you to chain artifacts together or use one artifact's
results as input to another.

![artifacts calling artifacts](artifacts_calling.svg)

Each _called_ artifact returns it's results to the _calling_ artifact's source.
Ultimately each source in the _calling_ artifact returns all the consolidated
results as a single table.

{{% notice info "Results may have mixed columns" %}}

The consolidated result sets from called artifacts could possibly have columns
which differ per row, due to different queries being run in each of their
sources. In that case the GUI will likely have trouble detecting and displaying
all columns, so specifying
[column_types]({{< ref "/docs/artifacts/advanced_fields/#-column_types-" >}})
on the top-level artifact is highly recommended in this situation.

{{% /notice %}}

[wrapper artifacts]({{< ref "/docs/artifacts/use_cases/#wrapper-artifacts" >}})

[utility artifacts]({{< ref "/docs/artifacts/use_cases/#utility-artifacts" >}})


Artifacts can also be called this way from VQL in [notebooks]({{< ref "/docs/notebooks/" >}}).
However since notebooks run on the server this means any artifacts called from
notebooks will also run on the server. If you want VQL in a notebook to schedule
a collection on clients then you should use the `collect_client` plugin, or else
create and launch a hunt using the `hunt` function to target multiple clients.

It's worth noting that while this special plugin allows calling the VQL logic
from other artifacts, using it directly in certain contexts (like with the "VQL
shell" which is based on the `Generic.Client.VQL artifact`, or in notebooks)
might have limitations compared to collecting the artifact directly. For
example, when running `SELECT * FROM Artifact...` directly in a notebook,
resource limits like `max_rows` (a client data transfer limit) do not apply
because a full collection lifecycle isn't initiated in that context.


## Basic syntax

The basic syntax to call other artifacts is:
`SELECT * FROM Artifact.ArtifactName()`

The `Artifact` part before the artifact name is actually the plugin that runs
the artifact. It functions like a module containing all available artifacts.

For example, to call an artifact named `Windows.Sys.Users` from another VQL query,
you would use `SELECT * FROM Artifact.Windows.Sys.Users()`

![Calling artifacts from a notebook](calling_artifacts.png)

The `Artifact` plugin is somewhat special in VQL. It's notable that it uses a
capital 'A', unlike other plugins, and it's main argument is the called artifact
name which immediately follows the plugin name, separated by a dot.

## Artifact dependency resolution

When an artifact calls another artifact, the VQL compiler on the server
recognizes the called artifact as a dependency. The server uses static analysis
of the query to determine which other artifacts are being called and therefore
that it needs to also send them to the client. It then copies the definition of
the dependent artifacts into the request to be sent the client. This is crucial
because the client needs the definition of the called artifact to evaluate the
VQL. This process of transforming the VQL and injecting dependent artifacts
happens automatically.

If the dependent artifact uses tools, Velociraptor will ensure that these are
present on the endpoint.


## Parameters

[Parameters]({{< ref "/docs/artifacts/parameters/" >}})
for the called artifact are passed as keyword arguments to the Artifact plugin:

`SELECT * FROM Artifact.ArtifactName(parameter1='value1', parameter2='value2')`

Note that curly braces `{}` are not used for the dictionary in VQL plugin
arguments, as they represent a sub-query context; you should use dict() or
unserialize a JSON blob. Backticks can be used for names with spaces or special
characters within the dictionary keys.

Since version 0.74, parameter unpacking (`` `**`=my_param_dict ``) is supported
for the `Artifact` plugin.

Artifact parameters are always passed as (serialized) strings. The parameter
[type]({{< ref "/docs/artifacts/parameters/#parameter-types" >}})
in the called artifact is responsible for converting these strings to the
corresponding VQL data type according to the parameter's `type` specification.


Some implicit parameters that are always allowed:

- `source` - see Windows.Registry.Sysinternals.Eulacheck
- `preconditions`

		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions()",
		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions(preconditions=TRUE)",

		// Select a specific source.
		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions(source='Source1')",

		// Should return no results as preconditions is false.
		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions(source='Source1', preconditions=TRUE)",

		service.repository/fixtures/plugin_test.go



## Sources

If the called artifact contains multiple
[sources]({{< ref "/docs/artifacts/sources/" >}}),
you might need to specify the particular source that you want to access.
This is done using the `source` argument.

`SELECT * FROM Artifact.ArtifactWithMultipleSources(source='Source1')`

If sources in the called artifact are not specified then all sources in the
called artifact will be run. Results from multiple sources are chained - that
is, concatenated in a single results table.

However these sources may themselves contain preconditions, and if we want these
preconditions to apply then we need to enable precondition evaluation, as
discussed below.



## Preconditions

The called artifact may itself have
[preconditions]({{< ref "/docs/artifacts/preconditions/" >}}).
By default, preconditions defined within the called artifact aren't evaluated
unless you provide the argument `preconditions=TRUE` to the Artifact plugin.
This is useful, for example, when customizing a default artifact like
`Generic.Client.Info` to call other artifacts, while still ensuring that the
correct VQL runs based on the target platform. Alternatively, conditional
behavior can be implemented using `switch()` or `if()` functions within VQL
blocks.



`SELECT * FROM Artifact.ArtifactWithPreconditions(preconditions=TRUE)`

