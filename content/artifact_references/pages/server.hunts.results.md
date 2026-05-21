---
title: Server.Hunts.Results
hidden: true
sitemap:
  disable: true
tags: [Server Artifact]
description: |
  Show the results from each artifact collection hunt.
---

Show the results from each artifact collection hunt.


<pre><code class="language-yaml">
name: Server.Hunts.Results
description: |
  Show the results from each artifact collection hunt.
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

