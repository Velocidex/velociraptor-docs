---
title: Server.Internal.ClientDelete
description: "Provides an internal event stream for client deletion notifications.\n"
hidden: true
sitemap:
  disable: true
tags: [Server Event Artifact]
build:
  list: never
---

Provides an internal event stream for client deletion notifications.


---

````yaml
name: Server.Internal.ClientDelete
description: |
  Provides an internal event stream for client deletion notifications.

type: SERVER_EVENT

column_types:
  - name: ClientId
    description: The client that was deleted.
  - name: Principal
    description: The principal who initiated the deletion.
````


