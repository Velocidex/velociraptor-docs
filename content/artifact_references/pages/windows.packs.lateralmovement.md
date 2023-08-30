---
title: Windows.Packs.LateralMovement
hidden: true
tags: [Client Artifact]
---

Detect evidence of lateral movement.


<pre><code class="language-yaml">
name: Windows.Packs.LateralMovement
description: |
  Detect evidence of lateral movement.

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

reference:
  - https://digital-forensics.sans.org/media/SANS_Poster_2018_Hunt_Evil_FINAL.pdf

sources:
  - name: AlternateLogon
    query: |
      SELECT * FROM Artifact.Windows.EventLogs.AlternateLogon()

  - name: WMIC
    query: |
      SELECT * FROM Artifact.Windows.Forensics.Prefetch()
      WHERE Executable =~ &quot;wmic.exe&quot;
  - name: ShimCache
    query: |
      SELECT * FROM Artifact.Windows.Registry.AppCompatCache()
      WHERE Name =~ &quot;wmic.exe&quot;
  - name: BAM
    query: |
      SELECT * FROM Artifact.Windows.Forensics.Bam()
      WHERE Binary =~ &quot;wmic.exe&quot;
  - name: AmCache
    query: |
      SELECT * FROM Artifact.Windows.System.Amcache()
      WHERE Binary =~ &quot;wmic.exe&quot;

</code></pre>

