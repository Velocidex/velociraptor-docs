---
title: System.Hunt.Archive
hidden: true
sitemap:
  disable: true
tags: [Client Event Artifact]
description: |
  Fires when a hunt is archived, thus enabling post-archive
  automation, for example cleanup or notification workflows.
---

Fires when a hunt is archived, thus enabling post-archive
automation, for example cleanup or notification workflows.

You can write a server event artifact to do something about the
hunts (like remove flows, generate zip file etc) once they are
archived.


<pre><code class="language-yaml">
name: System.Hunt.Archive
description: |
  Fires when a hunt is archived, thus enabling post-archive
  automation, for example cleanup or notification workflows.

  You can write a server event artifact to do something about the
  hunts (like remove flows, generate zip file etc) once they are
  archived.

type: CLIENT_EVENT

</code></pre>

