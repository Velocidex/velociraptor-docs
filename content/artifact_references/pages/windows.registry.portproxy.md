---
title: Windows.Registry.PortProxy
hidden: true
tags: [Client Artifact]
---

This artifact will return any items in the Windows PortProxy service
registry path. The most common configuration of this service is via the
lolbin netsh.exe; Metaspoit and other common attack tools also have
configuration modules.


<pre><code class="language-yaml">
name: Windows.Registry.PortProxy
description: |
    This artifact will return any items in the Windows PortProxy service
    registry path. The most common configuration of this service is via the
    lolbin netsh.exe; Metaspoit and other common attack tools also have
    configuration modules.

reference:
  - Port Proxy detection(http://www.dfirnotes.net/portproxy_detection/)
  - ATT&amp;CK T1090 - Connection Proxy(https://attack.mitre.org/techniques/T1090/)
    Adversaries may use a connection proxy to direct network traffic between
    systems or act as an intermediary for network communications to a command
    and control server to avoid direct connections to their infrastructure.

author: Matt Green - @mgreen27

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
 - name: KeyGlob
   default: HKEY_LOCAL_MACHINE\SYSTEM\*ControlSet*\services\PortProxy\**

sources:
 - name: PortProxy
   query: |
     SELECT OSPath,
         OSPath[-3] AS ProxyType,
         OSPath[-2] AS Protocol,
         regex_replace(source=OSPath.Basename, re=&quot;/&quot;, replace=&quot;:&quot;) as Listening,
         regex_replace(source=Data.value, re=&quot;/&quot;, replace=&quot;:&quot;) as Destination,
         Mtime as ModifiedTime,
         Type
       FROM glob(globs=KeyGlob, accessor=&quot;registry&quot;)
       WHERE Type


reports:
  - type: CLIENT
    template: |

      Port Forwarding: PortProxy
      ==========================
      {{ .Description }}

      {{ define &quot;report&quot; }}
         LET report = SELECT Protocol,
            ProxyType,
            Listening,
            Destination,
            ModifiedTime,
            ProxyType + Protocol + Listening + Destination as ServiceKey
         FROM source(source=&#x27;PortProxy&#x27;)
         GROUP BY ServiceKey
      {{ end }}

      {{ Query &quot;report&quot;  &quot;SELECT ProxyType, Protocol, Listening, Destination, ModifiedTime FROM report&quot; | Table }}

  - type: HUNT
    template: |

      Port Forwarding: PortProxy
      ==========================
      {{ .Description }}

      {{ define &quot;report&quot; }}
         LET report = SELECT Fqdn,
            Protocol,
            ProxyType,
            Listening,
            Destination,
            ModifiedTime,
            ProxyType + Protocol + Listening + Destination as ServiceKey
         FROM source(source=&#x27;PortProxy&#x27;)
         GROUP BY ServiceKey
      {{ end }}

      {{ Query &quot;report&quot;  &quot;SELECT Fqdn, ProxyType, Protocol, Listening, Destination, ModifiedTime FROM report&quot; | Table }}

</code></pre>

