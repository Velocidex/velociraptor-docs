---
title: Windows.Sys.FirewallRules
hidden: true
tags: [Client Artifact]
---

List Windows firewall rules.

<pre><code class="language-yaml">
name: Windows.Sys.FirewallRules
description: List Windows firewall rules.
reference:
  - https://social.technet.microsoft.com/Forums/azure/en-US/aaed9c6a-fb8b-4d43-8b69-9f4e0f619a8c/how-to-check-the-windows-firewall-settings-from-netsh-command?forum=winserverGP

parameters:
  - name: regKey
    default: HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\**\FirewallRules\*

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
        LET rules = SELECT Name as Value,
               parse_string_with_regex(string=Data,
                 regex=[&quot;Action=(?P&lt;Action&gt;[^|]+)&quot;,
                        &quot;Active=(?P&lt;Active&gt;[^|]+)&quot;,
                        &quot;Dir=(?P&lt;Dir&gt;[^|]+)&quot;,
                        &quot;Protocol=(?P&lt;Protocol&gt;[^|]+)&quot;,
                        &quot;LPort=(?P&lt;LPort&gt;[^|]+)&quot;,
                        &quot;Name=(?P&lt;Name&gt;[^|]+)&quot;,
                        &quot;Desc=(?P&lt;Desc&gt;[^|]+)&quot;,
                        &quot;App=(?P&lt;App&gt;[^|]+)&quot;]) as Record,
               Data,
               OSPath
        FROM glob(globs=regKey, accessor=&quot;registry&quot;)

        SELECT Value,
               Record.Name as Name,
               get(item=Record, field=&quot;Desc&quot;) as Description,
               Record.App as App,
               if(condition=Record.Active =~ &quot;TRUE&quot;, then=&quot;Yes&quot;, else=&quot;No&quot;) as Active,
               Record.Action as Action,
               Record.Dir as Dir,
               if(condition=Record.Protocol = &quot;6&quot;,
                  then=&quot;TCP&quot;,
                  else=if(condition=Record.Protocol = &quot;17&quot;,
                          then=&quot;UDP&quot;,
                          else=Record.Protocol)) as Protocol,
               if(condition=Record.LPort = NULL,
                  then=&quot;Any&quot;,
                  else=Record.LPort) as LPort,
               Record.Name as Name
        FROM rules

</code></pre>

