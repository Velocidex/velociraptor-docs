---
title: Linux.Proc.Arp
description: "Parses the ARP table from /proc/net/arp.\n"
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
build:
  list: never
---

Parses the ARP table from /proc/net/arp.


---

````yaml
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
````


