---
title: Linux.Sys.Services
hidden: true
tags: [Client Artifact]
---

Parse services from systemctl

<pre><code class="language-yaml">
name: Linux.Sys.Services
description: Parse services from systemctl 

sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;
    queries:
      - |
        LET services = SELECT Stdout FROM execve(argv=[&#x27;systemctl&#x27;, &#x27;list-units&#x27;,  &#x27;--type=service&#x27;])
        
        LET all_services = SELECT grok(grok=&quot;%{NOTSPACE:Unit}%{SPACE}%{NOTSPACE:Load}%{SPACE}%{NOTSPACE:Active}%{SPACE}%{NOTSPACE:Sub}%{SPACE}%{GREEDYDATA:Description}&quot;, data=Line) AS Parsed
        FROM parse_lines(accessor=&quot;data&quot;, filename=services.Stdout)
        
        SELECT * FROM foreach(row=all_services, column=&quot;Parsed&quot;) WHERE Unit =~ &quot;.service&quot;
        
        
</code></pre>

