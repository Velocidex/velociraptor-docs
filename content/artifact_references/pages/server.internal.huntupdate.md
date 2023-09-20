---
title: Server.Internal.HuntUpdate
hidden: true
tags: [Internal Artifact]
---

An internal queue to notify hunt dispatchers on all minions that a
certain hunt has changed and should be updated from the internal
cache.


<pre><code class="language-yaml">
name: Server.Internal.HuntUpdate
description: |
  An internal queue to notify hunt dispatchers on all minions that a
  certain hunt has changed and should be updated from the internal
  cache.

type: INTERNAL

column_types:
  - name: HuntId
  - name: Hunt
    type: json

</code></pre>

