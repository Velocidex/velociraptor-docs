---
title: Server.Internal.ClientScheduled
hidden: true
sitemap:
  disable: true
tags: [Internal Artifact]
description: |
  Fires an event when new flows are scheduled for a client to process.
---

Fires an event when new flows are scheduled for a client to process.


<pre><code class="language-yaml">
name: Server.Internal.ClientScheduled
description: |
  Fires an event when new flows are scheduled for a client to process.

type: INTERNAL
column_types:
  - name: ClientId
  - name: InFlightFlows
    description: New flows scheduled for the client
  - name: ClearFlows
    description: If this is set we clear all in flight flows.

</code></pre>

