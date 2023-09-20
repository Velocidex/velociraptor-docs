---
title: Server.Monitor.VeloMetrics
hidden: true
tags: [Server Artifact]
---

Get Velociraptor server metrics.


<pre><code class="language-yaml">
name: Server.Monitor.VeloMetrics
description: |
  Get Velociraptor server metrics.

type: SERVER

parameters:
  - name: MetricsURL
    default: http://localhost:8003/metrics

sources:
  - query: |
        LET stats = SELECT parse_string_with_regex(string=Content,
           regex=[
             'client_comms_concurrency (?P&lt;client_comms_concurrency&gt;[^\\s]+)',
             'client_comms_current_connections (?P&lt;client_comms_current_connections&gt;[^\\s]+)',
             'flow_completion (?P&lt;flow_completion&gt;[^\\s]+)',
             'process_open_fds (?P&lt;process_open_fds&gt;[^\\s]+)',
             'uploaded_bytes (?P&lt;uploaded_bytes&gt;[^\\s]+)',
             'uploaded_files (?P&lt;uploaded_files&gt;[^\\s]+)',
             'stats_client_one_day_actives{version="[^"]+"} (?P&lt;one_day_active&gt;[^\\s]+)',
             'stats_client_seven_day_actives{version="[^"]+"} (?P&lt;seven_day_active&gt;[^\\s]+)'
           ]) AS Stat, {
              // On Windows Prometheus does not provide these so we get our own.
              SELECT Times.user + Times.system as CPU,
                     MemoryInfo.RSS as RSS
              FROM pslist(pid=getpid())
           } AS PslistStats
        FROM  http_client(url=MetricsURL, chunk_size=50000)

        SELECT now() AS Timestamp,
               PslistStats.RSS AS process_resident_memory_bytes,
               parse_float(string=Stat.client_comms_concurrency)
                      AS client_comms_concurrency,
               parse_float(string=Stat.client_comms_current_connections)
                      AS client_comms_current_connections,
               parse_float(string=Stat.flow_completion) AS flow_completion,
               parse_float(string=Stat.uploaded_bytes) AS uploaded_bytes,
               parse_float(string=Stat.uploaded_files) AS uploaded_files,
               parse_float(string=Stat.process_open_fds)
                     AS process_open_fds,
               PslistStats.CPU AS process_cpu_seconds_total,
               parse_float(string=Stat.one_day_active)
                     AS one_day_active,
               parse_float(string=Stat.seven_day_active)
                     AS seven_day_active
        FROM stats

</code></pre>

