---
title: Windows.EventLogs.PowershellModule
hidden: true
tags: [Client Artifact]
---

This Artifact will search and extract Module events (Event ID 4103) from
Powershell-Operational Event Logs.

Powershell is commonly used by attackers across all stages of the attack
lifecycle. Although quite noisy Module logging can provide valuable insight.

There are several parameter's available for search leveraging regex.
  - DateAfter enables search for events after this date.
  - DateBefore enables search for events before this date.
  - ContextRegex enables regex search over ContextInfo text field.
  - PayloadRegex enables a regex search over Payload text field.
  - SearchVSS enables VSS search


<pre><code class="language-yaml">
name: Windows.EventLogs.PowershellModule
description: |
  This Artifact will search and extract Module events (Event ID 4103) from
  Powershell-Operational Event Logs.

  Powershell is commonly used by attackers across all stages of the attack
  lifecycle. Although quite noisy Module logging can provide valuable insight.

  There are several parameter&#x27;s available for search leveraging regex.
    - DateAfter enables search for events after this date.
    - DateBefore enables search for events before this date.
    - ContextRegex enables regex search over ContextInfo text field.
    - PayloadRegex enables a regex search over Payload text field.
    - SearchVSS enables VSS search


author: Matt Green - @mgreen27

reference:
  - https://attack.mitre.org/techniques/T1059/001/
  - https://www.fireeye.com/blog/threat-research/2016/02/greater_visibilityt.html

parameters:
  - name: EventLog
    default: C:\Windows\system32\winevt\logs\Microsoft-Windows-PowerShell%4Operational.evtx
  - name: DateAfter
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: DateBefore
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: ContextRegex
    description: &quot;regex search over Payload text field.&quot;
    type: regex
  - name: PayloadRegex
    description: &quot;regex search over Payload text field.&quot;
    type: regex

  - name: VSSAnalysisAge
    type: int
    default: 0
    description: |
      If larger than zero we analyze VSS within this many days
      ago. (e.g 7 will analyze all VSS within the last week).  Note
      that when using VSS analysis we have to use the ntfs accessor
      for everything which will be much slower.

sources:
  - query: |
        LET VSS_MAX_AGE_DAYS &lt;= VSSAnalysisAge
        LET Accessor = if(condition=VSSAnalysisAge &gt; 0, then=&quot;ntfs_vss&quot;, else=&quot;auto&quot;)

        -- Build time bounds
        LET DateAfterTime &lt;= if(condition=DateAfter,
            then=timestamp(epoch=DateAfter), else=timestamp(epoch=&quot;1600-01-01&quot;))
        LET DateBeforeTime &lt;= if(condition=DateBefore,
            then=timestamp(epoch=DateBefore), else=timestamp(epoch=&quot;2200-01-01&quot;))

        -- Determine target files
        LET files =
              SELECT *, OSPath as Source
              FROM glob(globs=EventLog, accessor=Accessor)

        -- Main query
        LET hits = SELECT * FROM foreach(
            row=files,
            query={
              SELECT
                timestamp(epoch=System.TimeCreated.SystemTime) As EventTime,
                System.EventID.Value as EventID,
                System.Computer as Computer,
                System.Security.UserID as SecurityID,
                EventData.ContextInfo as ContextInfo,
                EventData.Payload as Payload,
                Message,
                System.EventRecordID as EventRecordID,
                System.Level as Level,
                System.Opcode as Opcode,
                System.Task as Task,
                Source
              FROM parse_evtx(filename=OSPath, accessor=Accessor)
              WHERE EventID = 4103
                AND EventTime &gt; DateAfterTime
                AND EventTime &lt; DateBeforeTime
                AND if(condition=ContextRegex,
                    then=ContextInfo=~ContextRegex,else=TRUE)
                AND if(condition=PayloadRegex,
                    then=ContextInfo=~PayloadRegex,else=TRUE)
            })
          ORDER BY Source DESC

        -- Output results
        SELECT
            EventTime,
            EventID,
            Computer,
            SecurityID,
            ContextInfo,
            Payload,
            Message,
            EventRecordID,
            Level,
            Opcode,
            Task,
            Source
        FROM hits
        GROUP BY EventRecordID, Channel

</code></pre>

