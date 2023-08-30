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
  SELECT OS from info() where OS = &quot;windows&quot;

sources:
  - name: WMI Event Filters
    description: |
      {{ DocFrom &quot;Windows.Persistence.PermanentWMIEvents&quot; }}

    query: |
        SELECT * FROM Artifact.Windows.Persistence.PermanentWMIEvents()

  - name: Startup Items
    description: |
      {{ DocFrom &quot;Windows.Sys.StartupItems&quot; }}

    query: |
        SELECT * FROM Artifact.Windows.Sys.StartupItems()

  - name: Debug Bootstraping
    description: |
      {{ DocFrom &quot;Windows.Persistence.Debug&quot; }}

      If there are any rows in the table below then executing the
      program will also launch the program listed under the Debugger
      column.

    query: |
      SELECT * FROM Artifact.Windows.Persistence.Debug()

</code></pre>

