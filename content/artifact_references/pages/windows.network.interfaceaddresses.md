---
title: Windows.Network.InterfaceAddresses
hidden: true
tags: [Client Artifact]
---

Network interfaces and relevant metadata.

```yaml
name: Windows.Network.InterfaceAddresses
description: Network interfaces and relevant metadata.
sources:
  - precondition:
      SELECT OS From info() where OS = 'windows'
    query: |
        LET interface_address =
           SELECT Index, MTU, Name, HardwareAddr, Flags, Addrs
           from interfaces()

        SELECT Index, MTU, Name, HardwareAddr.String As HardwareAddr,
           Flags, Addrs.IP as IP, Addrs.Mask.String as Mask
        FROM flatten(query=interface_address)

```
