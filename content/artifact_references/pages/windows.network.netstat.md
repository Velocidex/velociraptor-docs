---
title: Windows.Network.Netstat
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
description: |
  Reports open network sockets on Windows including binding time,
  connection state, and owning process name.
---

Reports open network sockets on Windows including binding time,
connection state, and owning process name.


<pre><code class="language-yaml">
name: Windows.Network.Netstat
description: |
  Reports open network sockets on Windows including binding time,
  connection state, and owning process name.

sources:
- precondition: SELECT OS From info() where OS = 'windows'
  query: |
    LET processes &lt;= SELECT Name, Pid AS ProcPid FROM pslist()
    SELECT Pid, {
        SELECT Name from processes
        WHERE Pid = ProcPid
      } AS Name, FamilyString as Family,
      TypeString as Type,
      Status,
      Laddr.IP, Laddr.Port,
      Raddr.IP, Raddr.Port,
      Timestamp
    FROM netstat()

</code></pre>

