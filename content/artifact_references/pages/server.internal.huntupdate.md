---
title: Server.Internal.HuntUpdate
hidden: true
sitemap:
  disable: true
tags: [Internal Artifact]
description: |
  Notifies hunt dispatchers across all minions when a hunt's status or
  configuration changes, and should be updated from the internal
  cache.
---

Notifies hunt dispatchers across all minions when a hunt's status or
configuration changes, and should be updated from the internal
cache.

Users can also watch this queue to be notified when hunts are
modified (e.g. stopped, started etc).


<pre><code class="language-yaml">
name: Server.Internal.HuntUpdate
description: |
  Notifies hunt dispatchers across all minions when a hunt's status or
  configuration changes, and should be updated from the internal
  cache.

  Users can also watch this queue to be notified when hunts are
  modified (e.g. stopped, started etc).

type: INTERNAL

column_types:
  - name: HuntId
  - name: Hunt
    type: json

</code></pre>

