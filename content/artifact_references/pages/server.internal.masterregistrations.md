---
title: Server.Internal.MasterRegistrations
hidden: true
sitemap:
  disable: true
tags: [Internal Artifact]
description: |
  Advertises event subscriptions from the master node to all minions
  in a multi-frontend deployment.
---

Advertises event subscriptions from the master node to all minions
in a multi-frontend deployment.

The master will advertise to the minions the events it is interested in.


<pre><code class="language-yaml">
name: Server.Internal.MasterRegistrations
description: |
  Advertises event subscriptions from the master node to all minions
  in a multi-frontend deployment.
  
  The master will advertise to the minions the events it is interested in.

type: INTERNAL
column_types:
  - name: Events
    type: json_array

</code></pre>

