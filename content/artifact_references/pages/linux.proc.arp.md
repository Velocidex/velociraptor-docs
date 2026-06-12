---
title: Linux.Proc.Arp
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
description: |
  Parses the ARP table from /proc/net/arp.
---

Parses the ARP table from /proc/net/arp.


<pre><code class="language-yaml">
name: Linux.Proc.Arp
description: |
  Parses the ARP table from /proc/net/arp.

parameters:
  - name: ProcNetArp
    default: /proc/net/arp
sources:
  - precondition: |
      SELECT OS From info() where OS = 'linux'

    query: |
        SELECT * from split_records(
           filenames=ProcNetArp,
           regex='\\s{3,20}',
           first_row_is_headers=true)

</code></pre>

