---
title: Server.Utils.RemoveTimeline
hidden: true
tags: [Server Artifact]
---

Remove a child timeline from a super timeline.


<pre><code class="language-yaml">
name: Server.Utils.RemoveTimeline
description: |
  Remove a child timeline from a super timeline.

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

</code></pre>

