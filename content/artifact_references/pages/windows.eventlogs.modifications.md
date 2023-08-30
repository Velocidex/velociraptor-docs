---
title: Windows.EventLogs.Modifications
hidden: true
tags: [Client Artifact]
---

It is possible to disable windows event logs on a per channel or per
provider basis. Attackers may disable ciritcal log sources to
prevent detections.

This artifact reads the state of the event log system from the
registry and attempts to detect when event logs were disabled.


<pre><code class="language-yaml">
name: Windows.EventLogs.Modifications
description: |
  It is possible to disable windows event logs on a per channel or per
  provider basis. Attackers may disable ciritcal log sources to
  prevent detections.

  This artifact reads the state of the event log system from the
  registry and attempts to detect when event logs were disabled.

precondition:
  SELECT * FROM info() WHERE OS =~ &quot;windows&quot;

parameters:
  - name: ProviderRegex
    default: .
    type: regex
  - name: DateAfter
    description: &quot;search for modifications after this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: DateBefore
    description: &quot;search for modifications before this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp

sources:
  - name: Channels
    description: Detects status of log channels (event log files).
    query: |
      -- Build time bounds
      LET DateAfterTime &lt;= if(condition=DateAfter,
            then=DateAfter, else=timestamp(epoch=&quot;1600-01-01&quot;))
      LET DateBeforeTime &lt;= if(condition=DateBefore,
            then=DateBefore, else=timestamp(epoch=&quot;2200-01-01&quot;))

      LET Key = &quot;HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WINEVT\\Channels\\*&quot;

      SELECT Key.Mtime AS Mtime,
             basename(path=Key.OSPath) AS ChannelName,
             Key.OSPath AS _Key,
             OwningPublisher, Enabled
      FROM read_reg_key(globs=Key)
      WHERE ChannelName =~ ProviderRegex
        AND Mtime &gt; DateAfterTime
        AND Mtime &lt; DateBeforeTime

  - name: Providers
    description: Inspect the state of each provider
    query: |
      LET Key = &quot;HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\WMI\\Autologger\\EventLog-System\\**\\Enabled&quot;
      LET Publishers = &quot;HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WINEVT\\Publishers\\*\\@&quot;

      LET ProviderNames &lt;= memoize(key=&quot;GUID&quot;, query={
        SELECT OSPath.Components[-2] AS GUID,
               Data.value AS Name
        FROM glob(globs=Publishers, accessor=&quot;registry&quot;)
      })

      LET X = SELECT Mtime,
                     OSPath.Dirname.Basename AS GUID,
                     Data.value AS Enabled,
                     OSPath.Dirname AS Key,
                     to_dict(item={
                        SELECT Name AS _key, Data.value AS _value
                        FROM glob(root=OSPath.Dirname,
                                  globs=&quot;/*&quot;,
                                  accessor=&quot;registry&quot;)
                     }) AS Content
        FROM glob(globs=Key, accessor=&quot;registry&quot;)

      SELECT Mtime, GUID, Key AS _RegKey,
         get(item=ProviderNames, member=GUID).Name AS ProviderName,
         Enabled, Content
      FROM X
      WHERE ProviderName =~ ProviderRegex
        AND Mtime &gt; DateAfterTime
        AND Mtime &lt; DateBeforeTime
      ORDER BY ProviderName

</code></pre>

