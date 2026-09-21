---
title: Generic.Client.Trace
description: "Captures runtime trace information from the client at a specified\ninterval"
type: docs-no-toc
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
build:
  list: never
---

Captures runtime trace information from the client at a specified
interval

The artifact is automatically added when a non-zero Trace frequency
is selected for a collection in the GUI.

NOTE: You can also add the artifact directly, but then you will need
to cancel the collection manually since it will continue to run
until the collection timeout is reached.


---

````yaml
name: Generic.Client.Trace
description: |
  Captures runtime trace information from the client at a specified
  interval

  The artifact is automatically added when a non-zero Trace frequency
  is selected for a collection in the GUI.

  NOTE: You can also add the artifact directly, but then you will need
  to cancel the collection manually since it will continue to run
  until the collection timeout is reached.

parameters:
- name: FrequencySec
  type: int
  default: 10

sources:
- query: |
    SELECT * FROM if(condition=version(function="trace"),
    then={
       SELECT trace() AS TraceFile
       FROM clock(start=0, period=FrequencySec)
    })
````


