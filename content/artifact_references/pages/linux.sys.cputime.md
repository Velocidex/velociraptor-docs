---
title: Linux.Sys.CPUTime
hidden: true
tags: [Client Artifact]
---

Displays information from /proc/stat file about the time the cpu
cores spent in different parts of the system.


<pre><code class="language-yaml">
name: Linux.Sys.CPUTime
description: |
  Displays information from /proc/stat file about the time the cpu
  cores spent in different parts of the system.
parameters:
  - name: procStat
    default: /proc/stat
sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;
    query: |
        LET raw = SELECT * FROM split_records(
           filenames=procStat,
           regex=&#x27; +&#x27;,
           columns=[&#x27;core&#x27;, &#x27;user&#x27;, &#x27;nice&#x27;, &#x27;system&#x27;,
                    &#x27;idle&#x27;, &#x27;iowait&#x27;, &#x27;irq&#x27;, &#x27;softirq&#x27;,
                    &#x27;steal&#x27;, &#x27;guest&#x27;, &#x27;guest_nice&#x27;])
        WHERE core =~ &#x27;cpu.+&#x27;

        SELECT core AS Core,
               atoi(string=user) as User,
               atoi(string=nice) as Nice,
               atoi(string=system) as System,
               atoi(string=idle) as Idle,
               atoi(string=iowait) as IOWait,
               atoi(string=irq) as IRQ,
               atoi(string=softirq) as SoftIRQ,
               atoi(string=steal) as Steal,
               atoi(string=guest) as Guest,
               atoi(string=guest_nice) as GuestNice FROM raw

</code></pre>

