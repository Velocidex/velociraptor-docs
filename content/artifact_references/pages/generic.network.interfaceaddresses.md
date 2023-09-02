---
title: Generic.Network.InterfaceAddresses
hidden: true
tags: [Client Artifact]
---

Network interfaces and relevant metadata. This artifact works on all
supported OSs.


<pre><code class="language-yaml">
name: Generic.Network.InterfaceAddresses
description: |
  Network interfaces and relevant metadata. This artifact works on all
  supported OSs.

aliases:
  - Windows.Network.InterfaceAddresses

sources:
  - query: |
        LET interface_address =
           SELECT Index, MTU, Name, HardwareAddr, Flags, Addrs
           from interfaces()

        SELECT Index, MTU, Name, HardwareAddr.String As HardwareAddr,
           Flags, Addrs.IP as IP, Addrs.Mask.String as Mask
        FROM flatten(query=interface_address)

</code></pre>

