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

implied_permissions:
  - EXECVE

sources:
 - precondition:
     SELECT OS from info() where OS = "windows"
   query: |
     // Run ipconfig to get all information about interfaces.
     LET ipconfig = SELECT * FROM execve(argv=['ipconfig', '/all'])

     // This produces a single row per interface.
     LET interfaces = SELECT Name, Data FROM parse_records_with_regex(
        file=ipconfig.Stdout,
        accessor='data',      // This makes the data appear as a file.
        regex='(?s)Ethernet adapter (?P&lt;Name&gt;[^:]+?):\r\n\r\n(?P&lt;Data&gt;.+?)\r\n(\r\n|$)')

     // Now extract interesting things from each interface definition.
     SELECT Name, parse_string_with_regex(
        string=Data,
        regex=[
          "Description[^:]+: (?P&lt;Description&gt;.+)\r\n",
          "Physical Address[^:]+: (?P&lt;MAC&gt;.+)\r\n",
          "IPv4 Address[^:]+: (?P&lt;IP&gt;[0-9.]+)",
          "Default Gateway[^:]+: (?P&lt;Gateway&gt;.+)\r\n",
          "DNS Servers[^:]+: (?P&lt;DNS&gt;.+)\r\n   [^ ]",
          "DHCP Server[^:]+: (?P&lt;DHCP&gt;.+)\r\n"
        ]
     ) As Details FROM interfaces

</code></pre>

