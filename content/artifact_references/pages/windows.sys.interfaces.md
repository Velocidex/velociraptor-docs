---
title: Windows.Sys.Interfaces
hidden: true
tags: [Client Artifact]
---

Report information about the systems interfaces. This artifact
simply parses the output from ipconfig /all.


<pre><code class="language-yaml">
name: Windows.Sys.Interfaces
description: |
  Report information about the systems interfaces. This artifact
  simply parses the output from ipconfig /all.

sources:
 - precondition:
     SELECT OS from info() where OS = &quot;windows&quot;
   query: |
     // Run ipconfig to get all information about interfaces.
     LET ipconfig = SELECT * FROM execve(argv=[&#x27;ipconfig&#x27;, &#x27;/all&#x27;])

     // This produces a single row per interface.
     LET interfaces = SELECT Name, Data FROM parse_records_with_regex(
        file=ipconfig.Stdout,
        accessor=&#x27;data&#x27;,      // This makes the data appear as a file.
        regex=&#x27;(?s)Ethernet adapter (?P&lt;Name&gt;[^:]+?):\r\n\r\n(?P&lt;Data&gt;.+?)\r\n(\r\n|$)&#x27;)

     // Now extract interesting things from each interface definition.
     SELECT Name, parse_string_with_regex(
        string=Data,
        regex=[
          &quot;Description[^:]+: (?P&lt;Description&gt;.+)\r\n&quot;,
          &quot;Physical Address[^:]+: (?P&lt;MAC&gt;.+)\r\n&quot;,
          &quot;IPv4 Address[^:]+: (?P&lt;IP&gt;[0-9.]+)&quot;,
          &quot;Default Gateway[^:]+: (?P&lt;Gateway&gt;.+)\r\n&quot;,
          &quot;DNS Servers[^:]+: (?P&lt;DNS&gt;.+)\r\n   [^ ]&quot;,
          &quot;DHCP Server[^:]+: (?P&lt;DHCP&gt;.+)\r\n&quot;
        ]
     ) As Details FROM interfaces

</code></pre>

