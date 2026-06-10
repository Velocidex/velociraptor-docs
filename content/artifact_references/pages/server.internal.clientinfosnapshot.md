---
title: Server.Internal.ClientInfoSnapshot
hidden: true
sitemap:
  disable: true
tags: [Internal Artifact]
description: |
  Notifies minion nodes to refresh their client info cache when the
  master writes a new snapshot.
---

Notifies minion nodes to refresh their client info cache when the
master writes a new snapshot.

Minions use this to trigger a refresh of their client info
snapshots.


<pre><code class="language-yaml">
name: Server.Internal.ClientInfoSnapshot
type: INTERNAL
description: |
  Notifies minion nodes to refresh their client info cache when the
  master writes a new snapshot.
  
  Minions use this to trigger a refresh of their client info
  snapshots.

</code></pre>

