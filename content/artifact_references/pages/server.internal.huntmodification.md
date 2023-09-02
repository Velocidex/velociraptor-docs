---
title: Server.Internal.HuntModification
hidden: true
tags: [Internal Artifact]
---

An internal queue to watch modifications of hunts. The hunt
dispatcher from all nodes sends this mutation to the hunt manager
which applies it.


<pre><code class="language-yaml">
name: Server.Internal.HuntModification
description: |
  An internal queue to watch modifications of hunts. The hunt
  dispatcher from all nodes sends this mutation to the hunt manager
  which applies it.

type: INTERNAL

column_types:
  - name: HuntId
  - name: Mutation
    type: json

</code></pre>

