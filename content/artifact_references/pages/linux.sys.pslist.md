---
title: Linux.Sys.Pslist
hidden: true
tags: [Client Artifact]
---

List processes and their running binaries.


<pre><code class="language-yaml">
name: Linux.Sys.Pslist
description: |
  List processes and their running binaries.

aliases:
  - MacOS.Sys.Pslist

parameters:
  - name: processRegex
    default: .
    type: regex

precondition: |
  SELECT OS From info() where OS =~ 'linux|darwin'

sources:
  - query: |
        SELECT Pid, Ppid, Name, CommandLine, Exe,
               hash(path=Exe) as Hash,
               Username, timestamp(epoch=CreateTime/1000) AS CreatedTime,
               MemoryInfo.RSS AS RSS,
               Exe =~ "\\(deleted\\)$" AS Deleted
        FROM process_tracker_pslist()
        WHERE Name =~ processRegex

</code></pre>

