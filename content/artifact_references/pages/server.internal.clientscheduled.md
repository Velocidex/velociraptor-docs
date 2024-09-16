---
title: Server.Internal.ClientScheduled
hidden: true
tags: [Internal Artifact]
---

This event will be fired when a client was sent flows to process.


<pre><code class="language-yaml">
name: Server.Internal.ClientScheduled
description: |
  This event will be fired when a client was sent flows to process.

type: INTERNAL
column_types:
  - name: ClientId
  - name: InFlightFlows
    description: New flows scheduled for the client
  - name: ClearFlows
    description: If this is set we clear all in flight flows.

</code></pre>

