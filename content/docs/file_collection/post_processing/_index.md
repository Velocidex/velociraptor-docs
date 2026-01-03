---
title: "Post-processing collected files"
menutitle: "Post-processing"
date: 2025-11-01
last_reviewed: 2025-11-01
draft: false
weight: 20
---

[Velociraptor Triage Artifacts project](https://triage.velocidex.com/docs/triage_artifacts/)

`Windows.Triage.Targets` and `Windows.KapeFiles.Targets`

We do not do any post processing of these files - we just collect them.

We currently do not have artifacts that produce remapping for non-Windows file
collections, although it is possible to manually craft remappings that function
similarly for Linux or macOS.


{{% notice warning %}}

Post-processing files from the server's datastore is a stop-gap measure
which can be attempted in situations where the correct artifacts were not
collected but the associated files were uploaded to the server. Parsing
collected files through a remapped collection is not as accurate and reliable as
parsing files directly on the endpoint. Some artifacts depend on co-existing
data sources that would be present on a real endpoint, and which cannot be
emulated on the server. Such artifacts may fail or produce unexpected results.

As explained [here](/docs/deployment/offline_collections/),
if you want to run the artifacts on the endpoint just add them to the collector
in addition to the artifacts that collect files.

See
https://docs.velociraptor.app/training/playbooks/preservation/ for more info.

{{% /notice %}}



Uncomment the following and evaluate the cell to create new
collections based on the files collected from this artifact.

The below VQL will apply remapping so standard artifacts will
see the KapeFiles.Targets collection below as a virtual
Windows Client. The artifacts will be collected to a temporary
container and then re-imported as new collections into this
client.



`Windows.KapeFiles.Remapping`

1. Select the collection that contains data from either `Windows.Triage.Targets`
   or `Windows.KapeFiles.Targets`.

2. Create a cell based on the "Post-process collection" cell template. This is
   done by accessing the **Notebook** tab > **Results Overview** notebook cell >
   **Add cell** > **Suggestions** > **Post process collection.**

![Add the "post process collection" cell template](post-process-collection-01.svg)

3. Access the cell toolbar of the newly created cell and click the **Edit**
   button.

![Edit the new cell](post-process-collection-02.svg)

4. Edit the VQL by uncommenting the `SELECT * FROM Results` query, as described
   in the cell notes. Also edit the VQL to run your desired artifacts rather
   than the 2 example artifacts that are there by default.

![](post-process-collection-03.svg)

![](post-process-collection-04.svg)

![](post-process-collection-05.svg)

![](post-process-collection-06.svg)


{{% notice "Timeouts" %}}

collection timeout

notebook timeout

The
[notebook timeout]({{< ref "" >}})
can be extended via the server config, but 10 minutes is reasonable for most
notebook cell operations and the timeout is intended to protect against
poorly-constructed queries. In general if a cell needs longer than 10 minutes to
complete then you should probably consider approaching your task a different
way.




Running post-processing in a server artifact

{{% /notice %}}