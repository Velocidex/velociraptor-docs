---
title: Server.Alerts.WinPmem
hidden: true
tags: [Server Event Artifact]
---

Send an email if the pmem service has been installed on any of the
endpoints.

Note this requires that the Windows.Event.ServiceCreation
monitoring artifact be collected from clients.


<pre><code class="language-yaml">
name: Server.Alerts.WinPmem
description: |
   Send an email if the pmem service has been installed on any of the
   endpoints.

   Note this requires that the Windows.Event.ServiceCreation
   monitoring artifact be collected from clients.

type: SERVER_EVENT

parameters:
  - name: EmailAddress
    default: admin@example.com
  - name: SkipVerify
    type: bool
    description: If set we skip TLS verification.

sources:
  - query: |
        SELECT * FROM foreach(
          row={
            SELECT * from watch_monitoring(
              artifact=&#x27;Windows.Events.ServiceCreation&#x27;)
            WHERE ServiceName =~ &#x27;pmem&#x27;
          },
          query={
            SELECT * FROM mail(
              to=EmailAddress,
              subject=&#x27;Pmem launched on host&#x27;,
              period=60,
              skip_verify=SkipVerify,
              body=format(
                 format=&quot;WinPmem execution detected at %s for client %v&quot;,
                 args=[Timestamp, ClientId]
              )
          )
        })

</code></pre>

