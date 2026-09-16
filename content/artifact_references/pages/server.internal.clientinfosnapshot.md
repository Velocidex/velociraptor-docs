---
title: Server.Internal.ClientInfoSnapshot
description: "Notifies minion nodes to refresh their client info cache when the\nmaster writes a new snapshot."
hidden: true
sitemap:
  disable: true
tags: [Internal Artifact]
build:
  list: never
---

Notifies minion nodes to refresh their client info cache when the
master writes a new snapshot.

Minions use this to trigger a refresh of their client info
snapshots.


---

````yaml
name: Server.Internal.ClientInfoSnapshot
type: INTERNAL
description: |
  Notifies minion nodes to refresh their client info cache when the
  master writes a new snapshot.
  
  Minions use this to trigger a refresh of their client info
  snapshots.
````


