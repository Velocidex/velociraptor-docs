---
title: Server.Internal.Interrogate
hidden: true
tags: [Server Event Artifact]
---

An internal artifact used track new client interrogations by the
Interrogation service.


<pre><code class="language-yaml">
name: Server.Internal.Interrogate
description: |
  An internal artifact used track new client interrogations by the
  Interrogation service.

type: SERVER_EVENT

sources:
  - query: |
      SELECT * FROM foreach(
          row={
             SELECT ClientId, Flow, FlowId
             FROM watch_monitoring(artifact=&#x27;System.Flow.Completion&#x27;)
             WHERE Flow.artifacts_with_results =~ &#x27;Generic.Client.Info&#x27;
          },
          query={
            SELECT * FROM switch(
              a={
                  SELECT ClientId,
                    FlowId,
                    Architecture,
                    BuildTime,
                    Fqdn,
                    Hostname,
                    KernelVersion,
                    Labels,
                    Name,
                    OS,
                    Platform,
                    PlatformVersion
                 FROM source(
                    client_id=ClientId,
                    flow_id=FlowId,
                    source=&quot;BasicInformation&quot;,
                    artifact=&quot;Custom.Generic.Client.Info&quot;)
               },
            b={
                SELECT ClientId,
                  FlowId,
                  Architecture,
                  BuildTime,
                  Fqdn,
                  Hostname,
                  KernelVersion,
                  Labels,
                  Name,
                  OS,
                  Platform,
                  PlatformVersion
               FROM source(
                  client_id=ClientId,
                  flow_id=FlowId,
                  source=&quot;BasicInformation&quot;,
                  artifact=&quot;Generic.Client.Info&quot;)
            })
          })

</code></pre>

