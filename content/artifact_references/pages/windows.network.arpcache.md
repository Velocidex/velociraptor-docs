---
title: Windows.Network.ArpCache
hidden: true
tags: [Client Artifact]
---

Address resolution cache, both static and dynamic (from ARP, NDP).

<pre><code class="language-yaml">
name: Windows.Network.ArpCache
description: Address resolution cache, both static and dynamic (from ARP, NDP).
parameters:
  - name: wmiQuery
    default: |
      SELECT AddressFamily, Store, State, InterfaceIndex, IPAddress,
             InterfaceAlias, LinkLayerAddress
      from MSFT_NetNeighbor
  - name: wmiNamespace
    default: ROOT\StandardCimv2

  - name: kMapOfState
    default: |
     {
      &quot;0&quot;: &quot;Unreachable&quot;,
      &quot;1&quot;: &quot;Incomplete&quot;,
      &quot;2&quot;: &quot;Probe&quot;,
      &quot;3&quot;: &quot;Delay&quot;,
      &quot;4&quot;: &quot;Stale&quot;,
      &quot;5&quot;: &quot;Reachable&quot;,
      &quot;6&quot;: &quot;Permanent&quot;,
      &quot;7&quot;: &quot;TBD&quot;
     }

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
        LET interfaces &lt;=
          SELECT Index, HardwareAddr, IP
          FROM Artifact.Windows.Network.InterfaceAddresses()

        LET arp_cache = SELECT if(condition=AddressFamily=23,
                    then=&quot;IPv6&quot;,
                  else=if(condition=AddressFamily=2,
                    then=&quot;IPv4&quot;,
                  else=AddressFamily)) as AddressFamily,

               if(condition=Store=0,
                    then=&quot;Persistent&quot;,
                  else=if(condition=(Store=1),
                    then=&quot;Active&quot;,
                  else=&quot;?&quot;)) as Store,

               get(item=parse_json(data=kMapOfState),
                   member=encode(string=State, type=&#x27;string&#x27;)) AS State,
               InterfaceIndex, IPAddress,
               InterfaceAlias, LinkLayerAddress
            FROM wmi(query=wmiQuery, namespace=wmiNamespace)

        SELECT * FROM foreach(
          row=arp_cache,
          query={
             SELECT AddressFamily, Store, State, InterfaceIndex,
                    IP AS LocalAddress, HardwareAddr, IPAddress as RemoteAddress,
                    InterfaceAlias, LinkLayerAddress AS RemoteMACAddress
             FROM interfaces
             WHERE InterfaceIndex = Index
          })

</code></pre>

