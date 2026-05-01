---
title: Server.Internal.ClientInfo
hidden: true
sitemap:
  disable: true
tags: [Client Event Artifact]
description: |
  An internal artifact collecting client information. This is used to
  update the client info indexes. Clients send this automatically at
  startup and then every day.
---

An internal artifact collecting client information. This is used to
update the client info indexes. Clients send this automatically at
startup and then every day.

You do not need to enable this in the clien montoring table - it is
client initiated.


<pre><code class="language-yaml">
name: Server.Internal.ClientInfo
type: CLIENT_EVENT
description: |
  An internal artifact collecting client information. This is used to
  update the client info indexes. Clients send this automatically at
  startup and then every day.

  You do not need to enable this in the clien montoring table - it is
  client initiated.

</code></pre>

