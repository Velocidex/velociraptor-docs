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
      SELECT OS From info() where OS = 'linux'
    queries:
      - |
        LET services = SELECT Stdout FROM execve(argv=['systemctl', 'list-units',  '--type=service'])
        
        LET all_services = SELECT grok(grok="%{NOTSPACE:Unit}%{SPACE}%{NOTSPACE:Load}%{SPACE}%{NOTSPACE:Active}%{SPACE}%{NOTSPACE:Sub}%{SPACE}%{GREEDYDATA:Description}", data=Line) AS Parsed
        FROM parse_lines(accessor="data", filename=services.Stdout)
        
        SELECT * FROM foreach(row=all_services, column="Parsed") WHERE Unit =~ ".service"
        
        
</code></pre>

