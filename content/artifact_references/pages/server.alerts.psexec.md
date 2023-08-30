---
title: Server.Alerts.PsExec
hidden: true
tags: [Server Event Artifact]
---

Send an email if execution of the psexec service was detected on
any client. This is a server side artifact.

Note this requires that the Windows.Event.ProcessCreation
monitoring artifact be collected from clients.


<pre><code class="language-yaml">
name: Server.Alerts.PsExec
description: |
   Send an email if execution of the psexec service was detected on
   any client. This is a server side artifact.

   Note this requires that the Windows.Event.ProcessCreation
   monitoring artifact be collected from clients.

type: SERVER_EVENT

parameters:
  - name: EmailAddress
    default: admin@example.com
  - name: SkipVerify
    type: bool
    description: If set we skip TLS verification.
  - name: MessageTemplate
    default: |
      PsExec execution detected at %v: %v for client %v

sources:
  - query: |
        SELECT * FROM foreach(
          row={
            SELECT * from watch_monitoring(
              artifact=&#x27;Windows.Events.ProcessCreation&#x27;)
            WHERE Name =~ &#x27;psexesvc&#x27;
          },
          query={
            SELECT * FROM mail(
              to=EmailAddress,
              subject=&#x27;PsExec launched on host&#x27;,
              period=60,
              skip_verify=SkipVerify,
              body=format(
              format=MessageTemplate,
              args=[Timestamp, CommandLine, ClientId])
          )
        })

</code></pre>

