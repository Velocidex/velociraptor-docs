---
title: System.Hunt.Archive
hidden: true
tags: [Client Event Artifact]
---

An internal artifact that receives events when a hunt is archived.

You can write a server event artifact to do something about the
hunts (like remove flows, generate zip file etc).


<pre><code class="language-yaml">
name: System.Hunt.Archive
description: |
  An internal artifact that receives events when a hunt is archived.

  You can write a server event artifact to do something about the
  hunts (like remove flows, generate zip file etc).

type: CLIENT_EVENT

</code></pre>

