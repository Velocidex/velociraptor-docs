---
title: Windows.ETW.ETWSessions
hidden: true
tags: [Client Event Artifact]
---

Windows Event Tracing exposes a lot of low level system information
and events. It is normally employed by security tools to gather
telemetry, however may also be used maliciously.

This artifact monitors for all new ETW sessions and reports the
tracing process as well as the provider that is being traced.


<pre><code class="language-yaml">
name: Windows.ETW.ETWSessions
description: |
  Windows Event Tracing exposes a lot of low level system information
  and events. It is normally employed by security tools to gather
  telemetry, however may also be used maliciously.

  This artifact monitors for all new ETW sessions and reports the
  tracing process as well as the provider that is being traced.

type: CLIENT_EVENT

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

sources:
  - query: |
      LET PublisherGlob = pathspec(
        Path=&#x27;&#x27;&#x27;HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Publishers&#x27;&#x27;&#x27;,
        path_type=&quot;registry&quot;)

      LET GUIDLookup(GUID) = SELECT Data.value AS Provider
         FROM stat(accessor=&quot;registry&quot;, filename=PublisherGlob + (&quot;/&quot; + GUID + &quot;/@&quot;))

      SELECT System.TimeStamp AS Timestamp,
        if(condition=System.ID = 14, then=&quot;Installed&quot;, else=&quot;Removed&quot;) AS Action, {
           SELECT Name, CommandLine from pslist(pid=System.ProcessID)
        } AS ProcessInfo ,
        GUIDLookup(GUID=EventData.ProviderName)[0].Provider AS Provider,
        EventData.SessionName AS SessionName,
        System AS _System, EventData AS _EventData
      FROM watch_etw(guid=&quot;{B675EC37-BDB6-4648-BC92-F3FDC74D3CA2}&quot;, all=0x400)
      WHERE System.ID IN (14, 15)

</code></pre>

