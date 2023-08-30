---
title: Generic.Client.Stats
hidden: true
tags: [Client Event Artifact]
---

An Event artifact which generates client's CPU and memory statistics.

<pre><code class="language-yaml">
name: Generic.Client.Stats
description: An Event artifact which generates client&#x27;s CPU and memory statistics.
parameters:
  - name: Frequency
    description: Return stats every this many seconds.
    type: int
    default: &quot;10&quot;
type: CLIENT_EVENT

sources:
  - precondition: SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
      SELECT *, rate(x=CPU, y=Timestamp) AS CPUPercent
      FROM foreach(
         row={
           SELECT UnixNano
           FROM clock(period=Frequency)
         },
         query={
           SELECT UnixNano / 1000000000 as Timestamp,
                  User + System as CPU,
                  Memory.WorkingSetSize as RSS
           FROM pslist(pid=getpid())
         })

  - precondition: SELECT OS From info() where OS != &#x27;windows&#x27;
    query: |
      SELECT *, rate(x=CPU, y=Timestamp) AS CPUPercent
      FROM foreach(
         row={
           SELECT UnixNano
           FROM clock(period=Frequency)
         },
         query={
           SELECT UnixNano / 1000000000 as Timestamp,
                  Times.system + Times.user as CPU,
                  MemoryInfo.RSS as RSS
           FROM pslist(pid=getpid())
         })


reports:
  - type: SERVER_EVENT
    template: |
      {{ define &quot;resources&quot; }}
           SELECT Timestamp, rate(x=CPU, y=Timestamp) * 100 As CPUPercent,
                  RSS / 1000000 AS MemoryUse
           FROM source()
           WHERE CPUPercent &gt;= 0
      {{ end }}

      {{ Query &quot;resources&quot; | LineChart &quot;xaxis_mode&quot; &quot;time&quot; &quot;RSS.yaxis&quot; 2 }}

  - type: MONITORING_DAILY
    template: |
      {{ define &quot;resources&quot; }}
           SELECT Timestamp, rate(x=CPU, y=Timestamp) * 100 As CPUPercent,
                  RSS / 1000000 AS MemoryUse
           FROM source()
           WHERE CPUPercent &gt;= 0
      {{ end }}

      {{ $client_info := Query &quot;SELECT * FROM clients(client_id=ClientId) LIMIT 1&quot; }}

      # Client Footprint for {{ Get $client_info &quot;0.os_info.fqdn&quot; }}

      The client has a client ID of {{ Get $client_info &quot;0.client_id&quot; }}.
      Clients report the Velociraptor process footprint to the
      server every 10 seconds. The data includes the total CPU
      utilization, and the resident memory size used by the client.

      The following graph shows the total utilization. Memory
      utilization is meausred in `Mb` while CPU Utilization is
      measured by `Percent of one core`.

      We would expect the client to use around 1-5% of one core when
      idle, but if a heavy hunt is running this might climb
      substantially.

        &lt;div&gt;
        {{ Query &quot;resources&quot; | LineChart &quot;xaxis_mode&quot; &quot;time&quot; &quot;RSS.yaxis&quot; 2 }}
        &lt;/div&gt;

      ## VQL Query

      The following VQL query was used to plot the graph above.

      ```sql
      {{ template &quot;resources&quot; }}
      ```

      &gt; To learn about managing end point performance with Velociraptor see
        the [blog post](https://docs.velociraptor.velocidex.com/blog/html/2019/02/10/velociraptor_performance.html).

column_types:
  - name: Timestamp
    type: timestamp

  - name: ClientId
    type: client_id

</code></pre>

