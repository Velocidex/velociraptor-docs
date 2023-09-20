---
title: Server.Internal.Alerts
hidden: true
tags: [Server Event Artifact]
---

An internal event queue for alerts. All alerts sent from clients are
collected in this event queue.

Alerts are expected to be low frequency and high value and may be
generated client or server side.


<pre><code class="language-yaml">
name: Server.Internal.Alerts
description: |
  An internal event queue for alerts. All alerts sent from clients are
  collected in this event queue.

  Alerts are expected to be low frequency and high value and may be
  generated client or server side.

type: SERVER_EVENT

</code></pre>

