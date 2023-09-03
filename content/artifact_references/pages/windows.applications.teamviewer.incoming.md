---
title: Windows.Applications.TeamViewer.Incoming
hidden: true
tags: [Client Artifact]
---

Parses the TeamViewer Connections_incoming.txt log file.

When inbound logging enabled, this file will show all inbound TeamViewer
connections.


<pre><code class="language-yaml">
name: Windows.Applications.TeamViewer.Incoming
description: |
   Parses the TeamViewer Connections_incoming.txt log file.

   When inbound logging enabled, this file will show all inbound TeamViewer
   connections.

author: Matt Green - @mgreen27

reference:
  - https://attack.mitre.org/techniques/T1219/
  - https://www.systoolsgroup.com/forensics/teamviewer/


type: CLIENT
parameters:
  - name: FileGlob
    default: C:\Program Files (x86)\TeamViewer\Connections_incoming.txt
  - name: DateAfter
    description: "search for events after this date. YYYY-MM-DDTmm:hh:ss Z"
    type: timestamp
  - name: DateBefore
    description: "search for events before this date. YYYY-MM-DDTmm:hh:ss Z"
    type: timestamp
  - name: TeamViewerIDRegex
    description: "Regex of TeamViewer ID"
    default: .
    type: regex
  - name: SourceHostRegex
    description: "Regex of source host"
    default: .
    type: regex
  - name: UserRegex
    description: "Regex of user"
    default: .
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
      LET Accessor = if(condition=VSSAnalysisAge &gt; 0, then="ntfs_vss", else="auto")

      -- Build time bounds
      LET DateAfterTime &lt;= if(condition=DateAfter,
        then=DateAfter, else="1600-01-01")
      LET DateBeforeTime &lt;= if(condition=DateBefore,
        then=DateBefore, else="2200-01-01")

      -- expand provided glob into a list of paths on the file system (fs)
      LET fspaths &lt;= SELECT OSPath FROM glob(
         globs=expand(path=FileGlob), accessor=Accessor)

      LET parse_log(OSPath, Accessor) = SELECT OSPath,
          parse_string_with_regex(
            string=Line,
            regex="^(?P&lt;TeamViewerID&gt;^\\d+)\\s+"+
              "(?P&lt;SourceHost&gt;.+)\\s" +
              "(?P&lt;StartTime&gt;\\d{2}-\\d{2}-\\d{4}\\s\\d{2}:\\d{2}:\\d{2})\\s" +
              "(?P&lt;EndTime&gt;\\d{2}-\\d{2}-\\d{4}\\s\\d{2}:\\d{2}:\\d{2})\\s" +
              "(?P&lt;User&gt;.+)\\s+" +
              "(?P&lt;ConnectionType&gt;[^\\s]+)\\s+" +
              "(?P&lt;ConnectionID&gt;.+)$") as Record
        FROM parse_lines(filename=OSPath, accessor=Accessor)
        WHERE Line
          AND Record.TeamViewerID =~ TeamViewerIDRegex
          AND Record.SourceHost =~ SourceHostRegex
          AND Record.User =~ UserRegex

      -- function returning IOC hits
      LET logsearch(PathList) = SELECT * FROM foreach(
            row=PathList,
            query={
               SELECT *, timestamp(epoch=Record.StartTime,
                                format="02-01-2006 15:04:05") AS StartTime,
                      timestamp(epoch=Record.EndTime,
                                format="02-01-2006 15:04:05") AS EndTime
               FROM parse_log(OSPath=OSPath, Accessor=Accessor)
               WHERE StartTime &lt; DateBeforeTime
                    AND StartTime &gt; DateAfterTime
                    AND EndTime &lt; DateBeforeTime
                    AND EndTime &gt; DateAfterTime
            })

      SELECT
        Record.TeamViewerID as TeamViewerID,
        Record.SourceHost as SourceHost,
        StartTime,
        EndTime,
        Record.User as User,
        Record.ConnectionType as ConnectionType,
        Record.ConnectionID as ConnectionID,
        OSPath
      FROM logsearch(PathList=fspaths)

</code></pre>

