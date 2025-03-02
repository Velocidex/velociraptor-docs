---
title: Notebooks.VQLx2
hidden: true
tags: [notebook]
---

A notebook initialized with 2 VQL cells


<pre><code class="language-yaml">
name: Notebooks.VQLx2
description: |
  A notebook initialized with 2 VQL cells

type: NOTEBOOK

sources:
  - notebook:
    - type: vql
      name: First Cell
      output: |
        &lt;&lt; 1st cell: Click here to edit &gt;&gt;
      template: |
        SELECT * FROM orgs()
    - type: vql
      name: Second Cell
      output: |
        &lt;&lt; 2nd cell: Click here to edit &gt;&gt;
      template: |
        SELECT * FROM gui_users() WHERE name = whoami()

</code></pre>

