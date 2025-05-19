---
title: Managing Artifacts
menutitle: Managing Artifacts
date: 2025-05-03
last_reviewed: 2025-05-18
draft: false
weight: 10
summary: "How to find, manage, create and edit artifacts in the GUI"
---

Artifacts are created, edited and managed on the Artifacts screen in the GUI,
which allows you to search and view all artifacts known to your server. It also
includes a feature-rich artifact editor.

![Artifacts screen](artifacts_main_screen.svg)


## Searching artifacts

The search bar on the right side of the Artifacts screen allows you to search by
any text string, regular expression, and certain category expressions (see table
below).

As explained [here]({{< ref "/docs/artifacts/basics/" >}}) the `name`,
`aliases`, and `description` fields from all artifacts are indexed and
searchable.

When searching, you can also limit the results using predefined Category
Filters, which are available as a drop-down list next to the search bar.

| Category Filter | Filter expression | Notes |
|---|---|---|
| Client Artifacts | `type:CLIENT` |  |
| Server Artifacts | `type:SERVER` |  |
| Notebook templates | `type:NOTEBOOK` |  |
| All Artifacts | `<none>` | Only includes artifacts with sources. |
| Windows Only | `precondition:WINDOWS` |  |
| Linux Only | `precondition:LINUX` |  |
| macOS Only | `precondition:DARWIN` |  |
| Client Monitoring | `type:CLIENT_EVENT` |  |
| Server Monitoring | `type:SERVER_EVENT` |  |
| Using Tools | `tool:.+` |  |
| Exchange | `^exchange.+` |  |
| BuiltIn Only | `builtin:yes` |  |
| Custom Only | `builtin:no` |  |
| Basic Only | `metadata:basic` |  |
| Include Empty sources | `empty:true` | Same as "All Artifacts" filter but also includes artifacts without sources.\*\* |

\*\* For more information about artifacts without sources see
[here]({{< ref "/docs/artifacts/use_cases/#source-free-artifacts" >}}).

The above filter expressions can also be used in the search bar directly and
combined with search strings. Searches are _not_ case-sensitive.

For example:

- `process type:client_event` will show all client event artifacts that also
  (i.e. _and_ is implied) have the word "process".
- `tool:sysmonbinary` will show all artifacts that use the tool named
  "SysmonBinary".



## Importing artifact packs

There are
[many ways to add artifact definitions]({{< ref "/docs/artifacts/#loading-importing-and-saving-artifacts" >}})
to Velociraptor. On the Artifacts screen you can import zip archives containing
multiple artifacts.

![Importing an artifact pack](artifacts_import_zip.png)

When importing artifact packs you are given the option to add a custom prefix to
the artifact name (if you want a `.` then you need to add it to your prefix),
and the option to only import artifacts that match a name filter.

The file structure inside the zip doesn't matter. Velociraptor will search for
all files in the zip with a `.yaml` or `.yml` file extension. The imported
artifacts will be saved to the server's datastore using the file and folder
structure described
[here]({{< ref "/docs/artifacts/basics/#basic-fields" >}}).

## Importing artifacts using server artifacts

Velociraptor includes several server artifacts which can import additional
artifacts from related external projects.

|Project name|Project website|Import artifact|
|--|--|--|
|Velociraptor Artifact Exchange|https://docs.velociraptor.app/exchange/|`Server.Import.ArtifactExchange`|
|Curated Sigma Rules <br>(Hayabusa/Hayabusa Live/ChopChopGo)|https://sigma.velocidex.com/|`Server.Import.CuratedSigma`|
|RegistryHunter|https://registry-hunter.velocidex.com/|`Server.Import.RegistryHunter`|
|Rapid7Labs|https://github.com/rapid7/Rapid7-Labs/tree/main/Vql|`Server.Import.Rapid7Labs`|
|DetectRaptor|https://github.com/mgreen27/DetectRaptor|`Server.Import.ArtifactExchange`<br>-> `Server.Import.DetectRaptor`|
|Audit: a collection of Audit <br>and Compliance related VQL artifacts|https://github.com/Velocidex/Audit|manually imported|

The reason these artifacts are not included by default is that they are either
rapidly developing and not synced to the release cycle, or considered
experimental, or community contributed. Some, like RegistryHunter and Curated
Sigma Rules, may be included by default in future as these projects mature.

![Running server import artifacts](artifacts_server_import1.png)

![Customizing server import artifact parameters](artifacts_server_import2.png)

We also have two server artifacts which are designed to bulk-import artifacts
for the latest release or previous releases. The purpose these is to allow
(slightly) older deployments to access the latest artifacts in situations where
upgrading the server is not possible. Conversely we allow importing the
artifacts from older releases to cater for situations where clients cannot be
easily upgraded, yet need functionality only found in the latest artifacts.

||||
|--|--|--|
|Latest Artifacts||`Server.Import.UpdatedBuiltin`|
|Artifacts from previous versions||`Server.Import.PreviousReleases`|

{{% notice warning "Forward compatibility is not guaranteed!" %}}

While clients should have no problems running older versions of the standard
artifacts, we cannot guarantee that the latest artifact versions will be
compatible with older clients. This depends mainly on whether or not the latest
artifact versions contain VQL that uses new functions or plugins which the older
client may not have. You should always test your particular scenario.

{{% /notice %}}


## Creating and editing artifacts

**How to use the artifact editor.**

When you attempt to "edit" a built-in artifact in the GUI, you are actually
creating a customized _copy_ of that artifact. The GUI automatically adds the
prefix `Custom.` to the name of this new custom version. If you try to use the
same name as an existing built-in artifact (or alias) then you will receive an
error message and the artifact will not be saved.

You cannot delete the original built-in artifacts through the GUI either; the
delete button is greyed out for them.

Syntax highlighting for YAML and VQL.


### Autosuggest/autocomplete

The artifact editor offers suggestions and completions, as you type, for VQL
keywords, functions and plugins, as well as their arguments.

The suggestions also include previously defined strings in the artifact such as
parameter names and variable names. This helps you to avoid mistakes when typing
the names of previously defined parameters and variables in your VQL, since you
can simply select them from the suggestions list.

1. When you type `?`, or start typing a word, the editor presents a dropdown
   list of suggestions.

2. Use your `<Up>` and `<Down>` arrow keys to select an item from the
   suggestions list, and `<Enter>` to complete it. You can also use your mouse
   to hover over the suggestions list and select items, but using only your
   keyboard is much faster.

3. For each item in the suggestions list it also includes the type of each item
   being suggested (keyword, function, plugin, local string).

4. For VQL functions and plugins the suggestions list also provides a preview of
   the help documentation for the function/plugins as you step through them (or
   hover over them with your mouse).

![autosuggest: functions and plugins](autosuggest01.png)

![autosuggest: function and plugin arguments](autosuggest02.png)

![autosuggest: local strings (e.g. existing variables)](autosuggest03.png)

### Editor preferences and VQL reformatting

![The artifact editor](artifacts_editor.svg)

![editor preferences](editor_preferences.png)



## Deleting artifacts

All imported artifacts, and any others created during runtime, are created in
the server's datastore and can therefore be deleted.

This can be done:

- from the toolbar in the Artifacts screen, or
- via VQL (in a notebook or artifact) using the `artifact_delete` function, or
- if you wish to perform bulk deletion you can use the built-in utility artifact
  `Server.Import.DeleteArtifacts`.

Custom artifacts loaded from these sources are deemed "built-in":

- embedded in the config's `autoexec.artifact_definitions` section
- a directory specified by the `Frontend.artifact_definitions_directory` config setting
- additional directories specified by the `defaults.artifact_definitions_directories` config setting
- a directory specified by the `--definitions` CLI flag

Built-in artifacts cannot be deleted. If you need to delete them then you should
manually remove them from their source locations, and then restart the server.

For a futher discussion of built-in artifacts please see
[Built-in vs. Compiled-in vs. Custom Artifacts]({{< ref "/docs/artifacts/#built-in-vs-compiled-in-vs-custom-artifacts" >}}).


