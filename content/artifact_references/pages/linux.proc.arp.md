---
title: Linux.Proc.Arp
hidden: true
tags: [Client Artifact]
---

ARP table via /proc/net/arp.

<pre><code class="language-yaml">
name: Linux.Proc.Arp
description: ARP table via /proc/net/arp.
parameters:
  - name: ProcNetArp
    default: /proc/net/arp
sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;

    query: |
        SELECT * from split_records(
           filenames=ProcNetArp,
           regex=&#x27;\\s{3,20}&#x27;,
           first_row_is_headers=true)

</code></pre>

