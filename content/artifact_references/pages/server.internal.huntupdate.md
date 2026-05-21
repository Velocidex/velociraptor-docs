---
title: Server.Internal.HuntUpdate
hidden: true
sitemap:
  disable: true
tags: [Internal Artifact]
description: |
  An internal queue to notify hunt dispatchers on all minions that a
  certain hunt has changed and should be updated from the internal
  cache.
---

An internal queue to notify hunt dispatchers on all minions that a
certain hunt has changed and should be updated from the internal
cache.

Users can also watch this queue to be notified when hunts are
modified (e.g. stopped, started etc).


<pre><code class="language-yaml">
name: Server.Internal.HuntUpdate
description: |
  An internal queue to notify hunt dispatchers on all minions that a
  certain hunt has changed and should be updated from the internal
  cache.

  Users can also watch this queue to be notified when hunts are
  modified (e.g. stopped, started etc).

type: INTERNAL

column_types:
  - name: HuntId
  - name: Hunt
    type: json

</code></pre>

