---
title: Windows.Packs.Persistence
hidden: true
tags: [Client Artifact]
---

This artifact pack collects various persistence mechanisms in Windows.


<pre><code class="language-yaml">
name: Windows.Packs.Persistence
description: |
  This artifact pack collects various persistence mechanisms in Windows.

precondition:
  SELECT OS from info() where OS = "windows"

sources:
  - name: WMI Event Filters
    query: |
        SELECT * FROM Artifact.Windows.Persistence.PermanentWMIEvents()

  - name: Startup Items
    query: |
        SELECT * FROM Artifact.Windows.Sys.StartupItems()

  - name: Debug Bootstraping
    query: |
      SELECT * FROM Artifact.Windows.Persistence.Debug()

</code></pre>

