---
title: Generic.Client.VQL
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
description: |
  Runs an arbitrary VQL query on the endpoint.
---

Runs an arbitrary VQL query on the endpoint.


<pre><code class="language-yaml">
name: Generic.Client.VQL
description: |
  Runs an arbitrary VQL query on the endpoint.

required_permissions:
  - IMPERSONATION

parameters:
  - name: Command
    default: SELECT * FROM info()

sources:
  - query: |
      SELECT _SessionId, *
      FROM query(query=Command, env=dict(config=config))

  - name: Overview
    query: |
      SELECT _SessionId, timestamp(epoch=now()) AS Timestamp, Command
      FROM scope()

</code></pre>

