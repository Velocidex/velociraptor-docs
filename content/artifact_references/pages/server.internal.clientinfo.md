---
title: Server.Internal.ClientInfo
description: "Automatically collects and updates client info indexes from\nheartbeat messages."
hidden: true
sitemap:
  disable: true
tags: [Client Event Artifact]
build:
  list: never
---

Automatically collects and updates client info indexes from
heartbeat messages.

Clients send this automatically at startup and then every day.

You do not need to enable this in the client monitoring table - it
is client initiated.


---

````yaml
name: Server.Internal.ClientInfo
type: CLIENT_EVENT
description: |
  Automatically collects and updates client info indexes from
  heartbeat messages.
  
  Clients send this automatically at startup and then every day.

  You do not need to enable this in the client monitoring table - it
  is client initiated.
````


