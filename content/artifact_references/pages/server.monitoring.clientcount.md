---
title: Server.Monitoring.ClientCount
hidden: true
tags: [Server Event Artifact]
---

An artifact that sends an email every hour of the current state of
the deployment.


<pre><code class="language-yaml">
name: Server.Monitoring.ClientCount

description: |
   An artifact that sends an email every hour of the current state of
   the deployment.

type: SERVER_EVENT

parameters:
   - name: EmailAddress
     default: admin@example.com
   - name: SkipVerify
     type: bool
     description: If set we skip TLS verification.
   - name: CCAddress
     default:
   - name: Subject
     default: &quot;Deployment statistics for Velociraptor&quot;
   - name: Period
     default: &quot;3600&quot;

sources:
  - query: |
      LET metrics = SELECT * FROM Artifact.Server.Monitor.VeloMetrics()

      SELECT * FROM foreach(
        row={
            SELECT * FROM clock(period=atoi(string=Period))
        },
        query={
             SELECT * FROM mail(
                to=EmailAddress,
                cc=CCAddress,
                subject=Subject,
                period=60,
                skip_verify=SkipVerify,
                body=format(format=&#x27;Total clients currently connected %v&#x27;,
                     args=[metrics.client_comms_current_connections])
            )
        })

</code></pre>

