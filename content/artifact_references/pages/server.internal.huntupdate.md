---
title: Server.Internal.HuntUpdate
description: "Notifies hunt dispatchers across all minions when a hunt's status or\nconfiguration changes, and should be updated from the internal\ncache."
hidden: true
sitemap:
  disable: true
tags: [Internal Artifact]
build:
  list: never
---

Notifies hunt dispatchers across all minions when a hunt's status or
configuration changes, and should be updated from the internal
cache.

Users can also watch this queue to be notified when hunts are
modified (e.g. stopped, started etc).


---

````yaml
name: Server.Internal.HuntUpdate
description: |
  Notifies hunt dispatchers across all minions when a hunt's status or
  configuration changes, and should be updated from the internal
  cache.

  Users can also watch this queue to be notified when hunts are
  modified (e.g. stopped, started etc).

type: INTERNAL

column_types:
  - name: HuntId
  - name: Hunt
    type: json
````


