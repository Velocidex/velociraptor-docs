---
title: Server.Hunts.Results
description: "Returns the collected data rows for a specified artifact within a\nhunt.\n"
type: docs-no-toc
hidden: true
sitemap:
  disable: true
tags: [Server Artifact]
build:
  list: never
---

Returns the collected data rows for a specified artifact within a
hunt.


---

````yaml
name: Server.Hunts.Results
description: |
  Returns the collected data rows for a specified artifact within a
  hunt.

parameters:
  - name: huntId
    default: H.d05b2482
  - name: ArtifactName
    default: Linux.Mounts

type: SERVER

sources:
  - query: |
      SELECT * FROM hunt_results(hunt_id=huntId, artifact=ArtifactName)
````


