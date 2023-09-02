---
title: Server.Internal.Ping
hidden: true
tags: [Internal Artifact]
---

An internal queue for Ping requests. The queue is watched by the
replication service on the slave nodes which will notify the target
specified.


<pre><code class="language-yaml">
name: Server.Internal.Ping
description: |
  An internal queue for Ping requests. The queue is watched by the
  replication service on the slave nodes which will notify the target
  specified.

type: INTERNAL

column_types:
  - name: ClientId
  - name: NotifyTarget

</code></pre>

