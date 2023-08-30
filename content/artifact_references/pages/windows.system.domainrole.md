---
title: Windows.System.DomainRole
hidden: true
tags: [Client Artifact]
---

This artifact will extract Domain Role per machine.


<pre><code class="language-yaml">
name: Windows.System.DomainRole
author: &#x27;Matt Green - @mgreen27&#x27;
description: |
   This artifact will extract Domain Role per machine.

type: CLIENT

parameters:
   - name: HostNameRegex
     description: Regex filter by DNSHostName
     default: .
   - name: DomainRegex
     description: Regex filter by Domain
     default: .
   - name: RoleRegex
     description: Regex filter by Role
     default: .
     
sources:
  - precondition:
      SELECT OS From info() where OS =~ &#x27;windows&#x27;

    query: |
        SELECT 
            Domain, 
            DNSHostName, 
            if(condition= DomainRole=0,
                then=&#x27;Standalone Workstation&#x27;,
                else=if(condition= DomainRole=1,
                    then=&#x27;Member Workstation&#x27;,
                    else=if(condition= DomainRole=2,
                        then=&#x27;Standalone Server&#x27;,
                        else=if(condition= DomainRole=3,
                            then=&#x27;Member Server&#x27;,
                            else=if(condition= DomainRole=4,
                                then=&#x27;Backup Domain Controller&#x27;,
                                else=if(condition= DomainRole=5,
                                    then= &#x27;Primary Domain Controller&#x27;,
                                    else= &#x27;Unknown&#x27; )))))
                ) AS DomainRole
        FROM wmi(query=&#x27;SELECT * FROM Win32_ComputerSystem&#x27;,namespace=&#x27;ROOT/cimv2&#x27;)
        WHERE 
            DNSHostName =~ HostNameRegex
            AND Domain =~ DomainRegex
            AND DomainRole =~ RoleRegex
</code></pre>

