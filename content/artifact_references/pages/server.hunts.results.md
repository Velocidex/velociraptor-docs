---
title: Server.Hunts.Results
hidden: true
sitemap:
  disable: true
tags: [Server Artifact]
description: |
  Returns the collected data rows for a specified artifact within a
  hunt.
---

Returns the collected data rows for a specified artifact within a
hunt.


<pre><code class="language-yaml">
name: Server.Hunts.Results
description: |
  Returns the collected data rows for a specified artifact within a
  hunt.

parameters:
  - name: huntId
    default: H.d05b2482
  - name: ArtifactName
    default: Linux.Mounts

type: SERVER

sources:
  - query: |
      SELECT * FROM hunt_results(hunt_id=huntId, artifact=ArtifactName)

</code></pre>

