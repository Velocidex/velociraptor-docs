---
title: Server.Internal.ClientDelete
hidden: true
sitemap:
  disable: true
tags: [Server Event Artifact]
description: |
  Provides an internal event stream for client deletion notifications.
---

Provides an internal event stream for client deletion notifications.


<pre><code class="language-yaml">
name: Server.Internal.ClientDelete
description: |
  Provides an internal event stream for client deletion notifications.

type: SERVER_EVENT

column_types:
  - name: ClientId
    description: The client that was deleted.
  - name: Principal
    description: The principal who initiated the deletion.

</code></pre>

