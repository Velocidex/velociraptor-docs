---
title: Windows.Network.ListeningPorts
description: "Reports processes that have open listening ports with address,\nprotocol, and PID details.\n"
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
build:
  list: never
---

Reports processes that have open listening ports with address,
protocol, and PID details.


---

````yaml
name: Windows.Network.ListeningPorts
description: |
  Reports processes that have open listening ports with address,
  protocol, and PID details.

sources:
  - precondition:
      SELECT OS From info() where OS = 'windows'
    query: |
        LET process <= SELECT Name, Pid from pslist()

        SELECT * from foreach(
          row={
            SELECT Pid AS PortPid, Laddr.Port AS Port,
                   TypeString as Protocol, FamilyString as Family,
                   Laddr.IP as Address
            FROM netstat() where Status = 'LISTEN'
          },
          query={
            SELECT Pid, Name, Port, Protocol, Family, Address
            FROM process where Pid = PortPid
          })
````


