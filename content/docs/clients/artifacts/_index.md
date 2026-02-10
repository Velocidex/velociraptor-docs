---
title: "Collecting Artifacts"
menutitle: "Collecting Artifacts"
date: 2021-06-09T04:03:42Z
last_reviewed: 2025-12-29
draft: false
weight: 25
---

Velociraptor's superpower is a powerful query language termed
**VQL**. You might be surprised to learn that you have already been
using VQL all this time. When clicking in the VFS interface to sync a
directory listing or download files, the GUI was collecting artifacts
behind the scenes.

Click on the **Collected Artifacts** sidebar screen to view the
artifacts that have been collected so far.

![Collected Artifacts](collected_artifacts.svg)

This screen consists of two panes - the top pane shows a list of all
the **Artifacts** collected so far from this endpoint, while the bottom
pane shows information about the selected artifact.

All artifacts have a **Name**. In our example, you can see that we have been
collecting `System.VFS.ListDirectory` in order to populate the VFS screen.

Each artifact collection has a unique `Flow ID`, which is how
Velociraptor refers to a collection. The collection is created at a
certain time and starts some time later. If the client is offline, the
collection will start when it comes back online.

Collections also take parameters. In the previous example, the
`System.VFS.ListDirectory` artifact was used to list the directory
"C:\Users\user2".

A collection of artifacts can return rows or upload
files. This is because an artifact is simply a VQL query and all
queries return a sequence of rows.

## Example: collect scheduled tasks from endpoint.

To illustrate how artifacts can be used, let's collect a common
forensic artifact from our Windows endpoint. Windows allows commands
to be scheduled in the future. These tasks are typically stored in the
`C:\Windows\System32\Tasks` directory as XML files.

While it is nice to know the details behind where the scheduled tasks
are stored and how to parse them - this is completely unnecessary with
Velociraptor, since we have a built-in artifact ready to collect and
parse these tasks!

In the following I will walk through the steps for scheduling a new
`Windows.System.TaskScheduler` collection.

### Initiating a new collection

Start a new collection by clicking the **New Collection** button <i
class="fas fa-plus"></i>. This will open the new collection wizard as
show below.

![New Collection Wizard](new_collection_wizard.svg)

The Wizard contains a number of steps but you can skip them if they
are not needed. For this exercise we will examine each step in turn

### Searching for artifacts to collect

In the first step, search for an artifact to collect the type of
information you are after. In this case we will search for "task" to
see our `Windows.System.TaskScheduler` artifact.

The next step allows us to modify artifact parameters.

### Setting artifact parameters

Artifacts may accept parameters from the user which change the way the
artifact works. The detail of how artifact parameters work is
described in [Artifact Parameters]({{< ref
"/docs/artifacts/parameters/" >}}) but for the moment we just update
the parameters needed for the `Windows.System.TaskScheduler` artifact.

![Artifact Parameters](artifact_parameters.svg)

This artifact does not require much updating.  Artifacts have default
values for their parameter such that they mostly do the right thing
without needing to change them. In this case, the `TasksPath`
parameter specifies where to find the task XML files and is already
set to the default location.

For the purposes of our example, we will also upload the raw XML
files, so set the `AlsoUpload` parameter.

### Specify Resources

Velociraptor often runs on performance sensitive endpoints, like
servers and laptops, as well as low resource machines like cloud
virtual machines. It is critical to ensure that Velociraptor does not
generate undue load on the endpoint, leading to performance
degradation.

Velociraptor contains a number of mechanism to limit resource usage,
as a "fail safe" and to prevent accidentally overloading the
endpoint. You can read more details on [Resource Limits here]({{< ref
"/docs/artifacts/resources/" >}}), but for now notice that
Velociraptor's default resource limits are pretty sensible for most use cases.

![Artifact Resource usage](resource_use.png)


Collections by default run for 600 seconds before being cancelled -
odds are that collecting the scheduled tasks files should not take
that long. It should also not transfer more than a Gigabyte (which is
the default upload limit). So no custom limits are needed.

### Inspecting the collection request

Just prior to collecting, you can view the collection request in the GUI. This
gives a final view on what exactly will be collected, but may also be useful if
you want to subsequently automate the same collection using the
`collect_client()` VQL function.

![The collection request](collection_request.png)

### Launching the collection

Finally, click **Launch** to start the collection. After a short time,
the collection will complete.

![Collection Complete](viewing_complete_collection.svg)

We can see that this collection uploaded 227 files and added 227
rows. The VQL query parses each XML file in turn and uploads it to the server.

## Inspecting collection results

We can see more information about this collection in the tabs in the
bottom pane:

1. **Logs** - As the VQL query is executing on the endpoint, the query may
   produce log messages. This is called the **Query Log** and it is
   forwarded to the server. We are able to see how the query is
   progressing based on the query log.

![Query Log](query_logs.svg)

2. **Uploaded Files** - This tab shows all the files uploaded by this
   query. You can download any of these files individually from the
   server by simply clicking the link, or click the preview button to
   examine the file in the GUI.

![Uploaded Files](uploaded_files.svg)

![Uploaded File Preview](uploaded_files_preview.png)

3. **Result Tab** - This shows each result set in a table. A single
   collection may collect several artifacts. In this case you can
   choose which artifact to view by clicking the pull-down menu.

![Result Tab](results_tab.png)


## Inspecting and modifying artifacts

The **View Artifacts** screen allows you to search and find all
artifacts loaded by the Velociraptor server.

You can learn more about Velociraptor Artifacts in
[this section]({{< ref "/docs/artifacts/" >}}).

Search for an artifact in the search screen and select an artifact to view it.

The left pane shows the name of the artifact, a description and any
parameters the artifact may take. Finally we can inspect the VQL
source of the artifact.

![View Artifacts screen](artifacts_main_screen.svg)

You can edit any artifact by clicking the "Edit an Artifact" button <i
class="fas fa-pencil-alt"></i>

![Edit Artifact](edit_artifact.png)

User artifacts usually have the prefix `Custom.` since user artifacts cannot
override built in artifacts or use existing artifact names. When editing an
existing artifact, Velociraptor will automatically add the `Custom.` prefix to
the artifact name and saving it will produce a new artifact. Therefore both the
custom and built in artifact exist in Velociraptor at the same time. This allows
you to collect either the original or the customized version as you please.

## Saving collections to a favorite list

Many users find that they tend to collect some artifacts more commonly
than others. In that case you can save your favorite collections by
name and just recall them by clicking in the favorites list button.

To save a new favorite you select an existing (previously run) collection and
click the **Save Collection** button in the collection list's toolbar.

![Saving a collection to your favorites](favorites.svg)

A collection saved to your favorites includes any custom parameters from the
collection you are basing it on.

![Adding a collection from favorites](favorites2.png)

## Learn more

Go [here]({{< ref "/docs/artifacts/" >}}) to learn more about Velociraptor
Artifacts and about how to write your own artifacts.
