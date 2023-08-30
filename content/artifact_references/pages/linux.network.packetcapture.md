---
title: Linux.Network.PacketCapture
hidden: true
tags: [Client Artifact]
---

This artifact leverages tcpdump to natively capture packets.

The `Duration` parameter is used to define how long (in seconds) the capture should be.  Specific interfaces can be defined using the `Interface` parameter, otherwise the artifact defaults to an interface assignment of `any`.

A `BPF` (Berkeley Packet Filter) expression can also be supplied to filter the captured traffic as desired.

Read more about BPF expressions here: https://biot.com/capstats/bpf.html


<pre><code class="language-yaml">
name: Linux.Network.PacketCapture
author: Wes Lambert, @therealwlambert
description: |
  This artifact leverages tcpdump to natively capture packets.

  The `Duration` parameter is used to define how long (in seconds) the capture should be.  Specific interfaces can be defined using the `Interface` parameter, otherwise the artifact defaults to an interface assignment of `any`.

  A `BPF` (Berkeley Packet Filter) expression can also be supplied to filter the captured traffic as desired.
  
  Read more about BPF expressions here: https://biot.com/capstats/bpf.html

required_permissions:
  - EXECVE

parameters:
  - name: Duration
    type: integer
    description: Duration (in seconds) of PCAP to be recorded.
    default: 10
  
  - name: Interface
    type: string
    default: any

  - name: BPF
    type: string
    default:
    
precondition:
  SELECT * FROM info() where OS = &#x27;linux&#x27;

sources:
    - query: |
            LET pcap &lt;= tempfile(extension=&quot;.pcap&quot;)
            SELECT *, upload(file=pcap) AS PCAP
              FROM execve(argv=[&#x27;bash&#x27;, &#x27;-c&#x27;, format(format=&#x27;&#x27;&#x27;(tcpdump -nni %v -w %v %v) &amp; sleep %v; kill $!&#x27;&#x27;&#x27;, args=[Interface, pcap, BPF, Duration])], length=1000000)

</code></pre>

