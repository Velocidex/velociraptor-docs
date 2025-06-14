---
menutitle: "Artifact visibility"
title: "Artifact visibility"
date: 2025-05-24
weight: 100
draft: true
summary: "Controlling artifact visibility"
last_reviewed: 2025-05-24
---

The first goal is to clean up the vast number of artifacts that are
presented through the GUI. Because Velociraptor allows artifacts to be
customized, new artifacts to be added to large number of artifacts
imported from external sources (i.e. `Artifact Packs`), there could be
hundreds or thousands of artifacts loaded in the system. Many have
similar but different functionality. This can overwhelm a user with
too much choice and be confusing.

To clean up the interface, Velociraptor allows artifacts to be hidden
from the GUI. This means that they are not shown as part of the search
functionality in the artifact collections wizard or in the
artifact. However the artifacts still exist in Velociraptor and can be
seen as part of the `artifact_definitions()` plugin output.

The visibility of an artifact is controlled by `artifact metadata` - a
field attached to each artifact in the system. You can hide or show
each artifact using the `artifact_set_metadata()` function.

### Example: Making only certain artifacts visible.

The following VQL can be run in a notebook to hide all artifacts other
than a selected set:

```sql
LET VisibleArtifacts <= SELECT * FROM parse_csv(accessor="data",
filename='''Artifacts
Windows.Search.FileFinder
Windows.Forensics.Usn
Windows.NTFS.MFT
Generic.Client.Info
''')


SELECT name, name in VisibleArtifacts.Artifacts AS Visible
FROM artifact_definitions()
WHERE artifact_set_metadata(hidden=NOT name in VisibleArtifacts.Artifacts, name=name) OR TRUE
```

This results in only those artifacts appearing in the GUI.

![Hidden Artifacts](hidden_artifacts.svg)

This reduced view can help guide users into more preferred playbooks
and procedures, reducing confusion.
