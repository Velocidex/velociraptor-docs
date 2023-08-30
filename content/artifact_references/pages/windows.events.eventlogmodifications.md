---
title: Windows.Events.EventLogModifications
hidden: true
tags: [Client Event Artifact]
---

It is possible to disable windows event logs on a per channel or per
provider basis. Attackers may disable ciritcal log sources to
prevent detections.

This artifact monitors the state of the event log system from the
registry and attempts to detect when event logs were disabled.


<pre><code class="language-yaml">
name: Windows.Events.EventLogModifications
description: |
  It is possible to disable windows event logs on a per channel or per
  provider basis. Attackers may disable ciritcal log sources to
  prevent detections.

  This artifact monitors the state of the event log system from the
  registry and attempts to detect when event logs were disabled.

type: CLIENT_EVENT

precondition:
  SELECT * FROM info() WHERE OS =~ &quot;windows&quot;

parameters:
  - name: Period
    type: int
    default: 60

sources:
  - query: |
      LET Publishers = &quot;HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WINEVT\\Publishers\\*\\@&quot;

      LET ProviderNames &lt;= memoize(key=&quot;GUID&quot;, query={
        SELECT OSPath.Components[-2] AS GUID,
               Data.value AS Name
        FROM glob(globs=Publishers, accessor=&quot;registry&quot;)
      })

      LET Key = &quot;HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WINEVT\\Channels\\*&quot;

      LET Query = SELECT Key.Mtime AS Mtime,
           Key.OSPath[-1] AS ChannelName,
           format(format=&quot;%s/%v&quot;, args=[Key.OSPath[-1], Enabled]) AS QueryKey ,
           Key.OSPath AS _Key,
           get(item=ProviderNames, field=OwningPublisher).Name AS Publisher, Enabled
      FROM read_reg_key(globs=Key)

      SELECT * FROM diff(query=Query, period=Period, key=&quot;QueryKey&quot;)
      WHERE Diff =~ &quot;added&quot;

</code></pre>

