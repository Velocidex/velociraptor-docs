---
title: Generic.Client.CleanupTemp
hidden: true
tags: [Client Artifact]
---

This artifact cleans up the temp folder in the Velociraptor client.


<pre><code class="language-yaml">
name: Generic.Client.CleanupTemp
description: |
  This artifact cleans up the temp folder in the Velociraptor client.

parameters:
  - name: TempGlob
    default: "%TEMP%/**"
    description: Glob to find all the files in the temp folder.
  - name: AgeSeconds
    default: 600
    type: int
    description: Any files older than this many seconds will be removed.
  - name: ReadllyDoIt
    type: bool


sources:
  - query: |
      SELECT OSPath, Size, Mtime,
         if(condition=ReadllyDoIt, then=rm(filename=OSPath)) AS Removed
      FROM glob(globs=expand(path=TempGlob))
      WHERE NOT IsDir AND Mtime &lt; now() - AgeSeconds

</code></pre>

