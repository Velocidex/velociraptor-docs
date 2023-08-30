---
title: Linux.Triage.ProcessMemory
hidden: true
tags: [Client Artifact]
---

Dump process memory and upload to the server


<pre><code class="language-yaml">
name: Linux.Triage.ProcessMemory
description: |
  Dump process memory and upload to the server

precondition: SELECT OS From info() where OS = &#x27;linux&#x27;

parameters:
  - name: processPid
    type: int
    default: 2215

sources:
  - query: |
      SELECT Name as ProcessName, CommandLine, Pid,
             upload(file=format(format=&quot;/%d&quot;, args=processPid),
                    accessor=&quot;process&quot;) as CrashDump
      FROM pslist(pid=processPid)

</code></pre>

