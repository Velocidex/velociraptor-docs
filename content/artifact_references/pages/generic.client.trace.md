---
title: Generic.Client.Trace
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
description: |
  Captures runtime trace information from the client at a specified
  interval
---

Captures runtime trace information from the client at a specified
interval

The artifact is automatically added when a non-zero Trace frequency
is selected for a collection in the GUI.

NOTE: You can also add the artifact directly, but then you will need
to cancel the collection manually since it will continue to run
until the collection timeout is reached.


<pre><code class="language-yaml">
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

</code></pre>

