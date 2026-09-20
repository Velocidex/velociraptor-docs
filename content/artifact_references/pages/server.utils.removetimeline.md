---
title: Server.Utils.RemoveTimeline
description: "Deletes a child timeline from a specified super-timeline in a\nnotebook.\n"
hidden: true
sitemap:
  disable: true
tags: [Server Artifact]
build:
  list: never
---

Deletes a child timeline from a specified super-timeline in a
notebook.


---

````yaml
name: Server.Utils.RemoveTimeline
description: |
   Deletes a child timeline from a specified super-timeline in a
   notebook.

type: SERVER

parameters:
  - name: NotebookId
  - name: Timeline
    description: SuperTimeline name
  - name: ChildName
    description: Name of child timeline

sources:
  - query: |
      SELECT if(condition=ChildName AND Timeline AND NotebookId,
                then=timeline_delete(
                     timeline=Timeline,
                     notebook_id=NotebookId,
                     name=ChildName)) AS Removed
      FROM scope()
````


