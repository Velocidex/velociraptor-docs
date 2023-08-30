---
title: Windows.System.Handles
hidden: true
tags: [Client Artifact]
---

Enumerate the handles from selected processes.

Uncheck all the handle types below to fetch all handle types.


<pre><code class="language-yaml">
name: Windows.System.Handles
description: |
  Enumerate the handles from selected processes.

  Uncheck all the handle types below to fetch all handle types.

parameters:
  - name: processRegex
    description: A regex applied to process names.
    default: .
    type: regex

  - name: Files
    description: Search for File Handles
    type: bool
    default: Y
  - name: Key
    description: Search for Key Handles
    type: bool

sources:
  - query: |
      LET tokens &lt;= SELECT * FROM chain(
          a={SELECT &quot;File&quot; AS Type FROM scope() WHERE Files = &#x27;Y&#x27;},
          a2={SELECT &quot;Section&quot; AS Type FROM scope() WHERE Files = &#x27;Y&#x27;},
          b={SELECT &quot;Key&quot; AS Type FROM scope() WHERE Key = &#x27;Y&#x27;}
        )

      LET processes = SELECT Pid AS ProcPid, Name AS ProcName, Exe
        FROM pslist()
        WHERE ProcName =~ processRegex AND ProcPid &gt; 0

      SELECT * FROM foreach(
          row=processes,
          query={
            SELECT ProcPid, ProcName, Exe, Type, Name, Handle
            FROM handles(pid=ProcPid, types=tokens.Type)
          })

</code></pre>

