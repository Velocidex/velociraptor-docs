---
title: "Artifacts"
date: 2021-06-09T04:03:42Z
draft: false
weight: 15
---

Velociraptor's superpower is a powerful query language termed
`VQL`. You might be surprised to learn that you have already been
using VQL all this time. When clicking in the VFS interface to sync a
directory listing or download files, the GUI was collecting artifacts
behind the scenes.

Click on the `Collected Artifacts` sidebar screen to view the
artifacts that have been collected so far.

![Collected Artifacts](image71.png)

This screen consists of two panes - the top pane shows a list of all
the `Artifacts` collected so far from this endpoint, while the bottom
pane shows information about the selected artifact.

All artifacts have a **Name**. In our example, you can see that we have been collecting `System.VFS.DownloadFile` and
`System.VFS.ListDirectory` in order to populate the VFS screen.

Each artifact collection has a unique `Flow ID`, which is how
Velociraptor refers to a collection. The collection is created at a
certain time and starts some time later. If the client is offline, the collection will start when it
comes back online.

Collections also take parameters. In the previous example, the `System.VFS.ListDirectory` artifact was used to list
the directory "C:\Users\test".

A collection of artifacts can return rows or upload
files. This is because an artifact is simply a VQL query and all
queries return a sequence of rows.

## What are Artifacts?

An `Artifact` is a way to package one or more VQL queries in a
human readable YAML file, name it, and allow users to
collect it. An Artifact file simply embodies the query required to
collect or answer a specific question about the endpoint.

Ultimately Velociraptor is simply a VQL engine . That is, it processes a
VQL query producing a series of rows and sends those rows to
the server.

{{% notice note "Why does Velociraptor use Artifacts?" %}}

Artifacts encapsulate a VQL query inside a YAML file so that end users
do not need to understand the query to use it. This makes artifacts
easier to use and facilitates knowledge sharing with more experienced
users.

{{% /notice %}}

### Example: collect scheduled tasks from endpoint.

To illustrate how artifacts can be used, let's collect a common
forensic artifact from our Windows endpoint. Windows allows commands
to be scheduled in the future. These tasks are typically stored in the
`C:\Windows\System32\Tasks` directory as XML files.

While it is nice to know the details behind where the scheduled tasks
are stored and how to parse them - this is completely unnecessary with
Velociraptor, since we have a built-in artifact ready to collect these
tasks!

Start a new collection by clicking the `New Collection` button <i
class="fas fa-plus"></i>. This will open the new collection wizard as
show below.


![New Collection Wizard](image73.png)

The Wizard contains a number of steps but you can skip them if they
are not needed.

In the first step, search for an artifact to collect the type of
information you are after. In this case we will search for `task` to
see our `Windows.System.TaskScheduler` artifact.

{{% notice tip "Saving collections to a favorite list" %}}

Many users find that they tend to collect some artifacts more commonly
than others. In that case you can save your favorite collections by
name and just recall them by clicking in the favorites list button.

![New Collection Wizard](favorites.png)

{{% /notice %}}


The next step allows us to modify artifact parameters.

![Artifact Parameters](image74.png)

Each Artifact parameter has a default value.

For the purposes of our example, we will upload some raw XML files. Click `Launch` to start the collection. After a short time, the
collection will complete.

![Collection Complete](image75.png)

We can see that this collection uploaded 195 files and added 195
rows. The VQL query parses each XML file in turn and uploads it.

We can see more information about this collection in the tabs in the
bottom pane:

1. **Logs** - As the VQL query is executing on the endpoint, the query may
   produce log messages. This is called the `Query Log` and it is
   forwarded to the server. We are able to see how the query is
   progressing based on the query log.

![Query Log](image76.png)

2. **Uploaded Files** - This tab shows all the files uploaded by this
   query. You can download any of these files from the server by
   simply clicking the link.

![Uploaded Files](image77.png)

3. **Result Tab** - This shows each result set in a table. A single
   collection may collect several artifacts. In this case you can
   choose which artifact to view by clicking the pull down menu.

![Result Tab](image78.png)


## Inspecting and modifying artifacts

The `View Artifacts` screen allows you to search and find all
artifacts loaded into Velociraptor. Search for an artifact in the
search screen and select an artifact to view.

The left pane shows the name of the artifact, a description and any
parameters the artifact may take. Finally we can inspect the VQL
source of the artifact.

![View Artifact](image72.png)

You can edit any artifact by clicking the "Edit an Artifact" button <i class="fas fa-pencil-alt"></i>

![Edit Artifact](image85.png)

User artifacts must have the prefix “Custom.” in order to ensure that
user artifacts do not override built in artifacts. When editing an
existing artifact, Velociraptor will automatically add the Custom
prefix to the artifact name and will produce a new artifact. Therefore
both the custom and built in artifact exist in Velociraptor at the
same time. This allows you to collect either the original or the
customized version as you please.

## Learn more

To learn more about how to write your own artifacts click
[here]({{< ref "/docs/vql/artifacts/" >}}/)
