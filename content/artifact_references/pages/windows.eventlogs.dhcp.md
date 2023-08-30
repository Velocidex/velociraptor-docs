---
title: Windows.EventLogs.DHCP
hidden: true
tags: [Client Artifact]
---


This artifact parses the windows dhcp event log looking for evidence
of IP address assignments.

In some investigations it is important to be able to identify the
machine which was assigned a particular IP address at a point in
time. Usually these logs are available from the DHCP server, but in
many cases the server logs are not available (for example, if the
endpoint was visiting a different network or the DHCP server is on a
wireless router with no log retention).

On windows, there are two types of logs:

  1. The first type is the admin log
     (`Microsoft-Windows-Dhcp-Client%4Admin.evt`). These only contain
     errors such as an endpoint trying to continue its lease, but
     the lease is rejected by the server.

  2. The operational log
     (`Microsoft-Windows-Dhcp-Client%4Operational.evtx`) contains
     the full log of each lease. Unfortunately this log is disabled
     by default. If it is available we can rely on the information.


<pre><code class="language-yaml">
name: Windows.EventLogs.DHCP
description: |

  This artifact parses the windows dhcp event log looking for evidence
  of IP address assignments.

  In some investigations it is important to be able to identify the
  machine which was assigned a particular IP address at a point in
  time. Usually these logs are available from the DHCP server, but in
  many cases the server logs are not available (for example, if the
  endpoint was visiting a different network or the DHCP server is on a
  wireless router with no log retention).

  On windows, there are two types of logs:

    1. The first type is the admin log
       (`Microsoft-Windows-Dhcp-Client%4Admin.evt`). These only contain
       errors such as an endpoint trying to continue its lease, but
       the lease is rejected by the server.

    2. The operational log
       (`Microsoft-Windows-Dhcp-Client%4Operational.evtx`) contains
       the full log of each lease. Unfortunately this log is disabled
       by default. If it is available we can rely on the information.

parameters:
  - name: eventDirGlob
    default: C:\Windows\system32\winevt\logs\

  - name: adminLog
    default: Microsoft-Windows-Dhcp-Client%4Admin.evtx

  - name: operationalLog
    default: Microsoft-Windows-Dhcp-Client%4Operational.evtx

  - name: accessor
    default: file

sources:
  - name: RejectedDHCP
    query: |
        LET files = SELECT *
          FROM glob(
            root=eventDirGlob,
            globs=adminLog,
            accessor=accessor)

        SELECT Time AS _Time,
               timestamp(epoch=Time) As Timestamp,
               Computer, MAC, ClientIP, DHCPServer, Type FROM foreach(
           row=files,
           query={
              SELECT System.TimeCreated.SystemTime as Time,
                     System.Computer AS Computer,
                     format(format=&quot;%x:%x:%x:%x:%x:%x&quot;, args=[EventData.HWAddress]) AS MAC,
                     ip(netaddr4_le=EventData.Address1) AS ClientIP,
                     ip(netaddr4_le=EventData.Address2) AS DHCPServer,
                     &quot;Lease Rejected&quot; AS Type
              FROM parse_evtx(filename=OSPath, accessor=accessor)
              WHERE System.EventID.Value = 1002
           })

  - name: AssignedDHCP
    query: |
        SELECT Time AS _Time,
               timestamp(epoch=Time) As Timestamp,
               Computer, MAC, ClientIP, DHCPServer, Type FROM foreach(
           row=files,
           query={
              SELECT System.TimeCreated.SystemTime as Time,
                     System.Computer AS Computer,
                     EventData.InterfaceGuid AS MAC,
                     ip(netaddr4_le=EventData.Address1) AS ClientIP,
                     ip(netaddr4_le=EventData.Address2) AS DHCPServer,
                     &quot;Lease Assigned&quot; AS Type
              FROM parse_evtx(filename=OSPath, accessor=accessor)
              WHERE System.EventID.Value = 60000
           })


reports:
  - type: CLIENT
    template: |
      Evidence of DHCP assigned IP addresses
      ======================================

      {{ .Description }}

      {{ define &quot;assigned_dhcp&quot; }}
            SELECT Computer, ClientIP,
                   count(items=Timestamp) AS Total,
                   enumerate(items=Timestamp) AS Times
            FROM source(source=&#x27;AssignedDHCP&#x27;)
            GROUP BY ClientIP
      {{ end }}
      {{ define &quot;rejected_dhcp&quot; }}
            SELECT Computer, ClientIP,
                   count(items=Timestamp) AS Total,
                   enumerate(items=Timestamp) AS Times
            FROM source(source=&#x27;RejectedDHCP&#x27;)
            GROUP BY ClientIP
      {{ end }}

      {{ $assigned := Query &quot;assigned_dhcp&quot;}}
      {{ if $assigned }}
      ## Operational logs

      This machine has DHCP operational logging enabled. We therefore
      can see complete references to all granted leases:
        {{ Table $assigned }}

      ## Timeline

      {{ Query &quot;SELECT _Time * 1000, ClientIP FROM source(source=&#x27;AssignedDHCP&#x27;)&quot; | Timeline }}

      {{ end }}

      ## Admin logs

      The admin logs show errors with DHCP lease requests. Typically
      rejected leases indicate that the machine held a least on a IP
      address in the past, but this lease is invalid for its current
      environment. For example, the machine has been moved to a
      different network.

      {{ Query &quot;rejected_dhcp&quot; | Table }}

      {{ Query &quot;SELECT _Time * 1000, ClientIP FROM source(source=&#x27;RejectedDHCP&#x27;)&quot; | Timeline }}

</code></pre>

