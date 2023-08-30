---
title: Windows.Network.ListeningPorts
hidden: true
tags: [Client Artifact]
---

Processes with listening (bound) network sockets/ports.

<pre><code class="language-yaml">
name: Windows.Network.ListeningPorts
description: Processes with listening (bound) network sockets/ports.
sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
        LET process &lt;= SELECT Name, Pid from pslist()

        SELECT * from foreach(
          row={
            SELECT Pid AS PortPid, Laddr.Port AS Port,
                   TypeString as Protocol, FamilyString as Family,
                   Laddr.IP as Address
            FROM netstat() where Status = &#x27;LISTEN&#x27;
          },
          query={
            SELECT Pid, Name, Port, Protocol, Family, Address
            FROM process where Pid = PortPid
          })

</code></pre>

