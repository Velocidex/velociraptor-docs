---
title: System.Hunt.Archive
description: "Fires when a hunt is archived, thus enabling post-archive\nautomation, for example cleanup or notification workflows."
hidden: true
sitemap:
  disable: true
tags: [Client Event Artifact]
build:
  list: never
---

Fires when a hunt is archived, thus enabling post-archive
automation, for example cleanup or notification workflows.

You can write a server event artifact to do something about the
hunts (like remove flows, generate zip file etc) once they are
archived.


---

````yaml
name: System.Hunt.Archive
description: |
  Fires when a hunt is archived, thus enabling post-archive
  automation, for example cleanup or notification workflows.

  You can write a server event artifact to do something about the
  hunts (like remove flows, generate zip file etc) once they are
  archived.

type: CLIENT_EVENT
````


