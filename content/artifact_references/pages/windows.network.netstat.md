---
title: Windows.Network.Netstat
description: "Reports open network sockets on Windows including binding time,\nconnection state, and owning process name.\n"
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
build:
  list: never
---

Reports open network sockets on Windows including binding time,
connection state, and owning process name.


---

````yaml
name: Windows.Network.Netstat
description: |
  Reports open network sockets on Windows including binding time,
  connection state, and owning process name.

sources:
- precondition: SELECT OS From info() where OS = 'windows'
  query: |
    LET processes <= SELECT Name, Pid AS ProcPid FROM pslist()
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
````


