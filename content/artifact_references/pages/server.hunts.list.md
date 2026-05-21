---
title: Server.Hunts.List
hidden: true
sitemap:
  disable: true
tags: [Server Artifact]
description: |
  List Hunts currently scheduled on the server.
---

List Hunts currently scheduled on the server.


<pre><code class="language-yaml">
name: Server.Hunts.List
description: |
  List Hunts currently scheduled on the server.

type: SERVER

sources:
  - query: |
      SELECT hunt_id,
             timestamp(epoch=create_time) as Created,
             join(array=start_request.artifacts, sep=",") as Artifact,
             state
      FROM hunts()

</code></pre>

