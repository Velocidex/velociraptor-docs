---
title: Generic.Client.VQL
hidden: true
tags: [Client Artifact]
---

Run arbitrary VQL on the endpoint.


<pre><code class="language-yaml">
name: Generic.Client.VQL
description: |
  Run arbitrary VQL on the endpoint.

required_permissions:
  - EXECVE

parameters:
  - name: Command
    default: SELECT * FROM info()

sources:
  - query: |
      SELECT * FROM query(query=Command, env=dict(config=config))

</code></pre>

