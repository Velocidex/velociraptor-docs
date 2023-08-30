---
title: Server.Monitor.Health
hidden: true
tags: [Server Event Artifact]
---

This is the main server health dashboard. It is shown on the
homescreen and enabled by default on all new installs.

You may edit this artifact to customize your server dashboard.

Alternatively, edit the Welcome screen at the
`Server.Internal.Welcome` artifact.


<pre><code class="language-yaml">
name: Server.Monitor.Health
description: |
  This is the main server health dashboard. It is shown on the
  homescreen and enabled by default on all new installs.

  You may edit this artifact to customize your server dashboard.

  Alternatively, edit the Welcome screen at the
  `Server.Internal.Welcome` artifact.

type: SERVER_EVENT

sources:
  - name: Prometheus
    query: SELECT sleep(time=10000000) FROM scope()

reports:
  - type: SERVER_EVENT
    # Only allow the report to run for 10 seconds - this is plenty for
    # the GUI.
    timeout: 10
    parameters:
      - name: Sample
        default: &quot;6&quot;

    template: |
      {{ define &quot;CPU&quot; }}
          SELECT _ts as Timestamp,
              CPUPercent,
              MemoryUse / 1048576 AS MemoryUse,
              TotalFrontends
          FROM source(source=&quot;Prometheus&quot;,
                      artifact=&quot;Server.Monitor.Health&quot;)
      {{ end }}

      {{ define &quot;CurrentConnections&quot; }}
           SELECT * FROM sample(
             n=atoi(string=Sample),
             query={
               SELECT _ts as Timestamp,
                  client_comms_current_connections
               FROM source(source=&quot;Prometheus&quot;,
                           artifact=&quot;Server.Monitor.Health&quot;)
            })
      {{ end }}

      {{ $time := Query &quot;SELECT timestamp(epoch=now()) AS Now FROM scope()&quot; | Expand }}

      ## Server status @ {{ Get $time &quot;0.Now&quot; }}

      &lt;p&gt;The following are total across all frontends.&lt;/p&gt;
          &lt;span class=&quot;container&quot;&gt;
            &lt;span class=&quot;row&quot;&gt;
              &lt;span class=&quot;col-sm panel&quot;&gt;
               CPU and Memory Utilization
               {{- Query &quot;CPU&quot; | LineChart &quot;xaxis_mode&quot; &quot;time&quot; &quot;RSS.yaxis&quot; 2 -}}
              &lt;/span&gt;
              &lt;span class=&quot;col-sm panel&quot;&gt;
               Currently Connected Clients
               {{- Query &quot;CurrentConnections&quot; | LineChart &quot;xaxis_mode&quot; &quot;time&quot; &quot;RSS.yaxis&quot; 2 -}}
              &lt;/span&gt;
            &lt;/span&gt;
      &lt;/span&gt;

      ## Current Orgs

      {{ Query &quot;LET ColumnTypes &lt;= dict(ClientConfig=&#x27;url_internal&#x27;) \
                SELECT Name, OrgId, \
                       format(format=&#x27;[%s](/notebooks/Dashboards/uploads/%%22%s/client.%s.config.yaml%%22)&#x27;, \
                       args=[OrgId, ArtifactName, OrgId]) AS ClientConfig, \
                       upload(accessor=&#x27;data&#x27;, file=_client_config, \
                              name=&#x27;client.&#x27;+OrgId+&#x27;.config.yaml&#x27;) AS _Upload \
                FROM orgs() &quot; | Table }}

      ## Disk Space

      {{ Query &quot;SELECT * FROM Artifact.Generic.Client.DiskSpace()&quot; | Table }}

      ## Users

      {{ define &quot;UserPermissions&quot; }}
        SELECT name, effective_policy AS _EffectivePolicy,
               join(array=roles, sep=&quot;, &quot;) AS Roles
        FROM gui_users()
      {{ end }}

      {{ Query &quot;UserPermissions&quot; | Table }}

      ## Server version

      {{ Query &quot;SELECT Version FROM config&quot; | Table }}

</code></pre>

