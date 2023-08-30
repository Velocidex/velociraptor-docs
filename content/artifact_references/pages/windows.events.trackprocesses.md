---
title: Windows.Events.TrackProcesses
hidden: true
tags: [Client Event Artifact]
---

This artifact uses sysmon and pslist to keep track of running
processes using the Velociraptor process tracker.

The Process Tracker keeps track of exited processes, and resolves
process callchains from it in memory cache.

This event artifact enables the global process tracker and makes it
possible to run many other artifacts that depend on the process
tracker.


<pre><code class="language-yaml">
name: Windows.Events.TrackProcesses
description: |
  This artifact uses sysmon and pslist to keep track of running
  processes using the Velociraptor process tracker.

  The Process Tracker keeps track of exited processes, and resolves
  process callchains from it in memory cache.

  This event artifact enables the global process tracker and makes it
  possible to run many other artifacts that depend on the process
  tracker.

type: CLIENT_EVENT

tools:
  - name: SysmonBinary
    url: https://live.sysinternals.com/tools/sysmon64.exe
    serve_locally: true

  - name: SysmonConfig
    url: https://raw.githubusercontent.com/SwiftOnSecurity/sysmon-config/master/sysmonconfig-export.xml
    serve_locally: true

parameters:
  - name: AlsoForwardUpdates
    type: bool
    description: |
      If set we also send process tracker state updates to
      the server.
  - name: MaxSize
    type: int64
    description: Maximum size of the in memory process cache (default 10k)

  - name: SysmonFileLocation
    description: If set, we check this location first for sysmon installed.
    default: C:/Windows/sysmon64.exe

  - name: AddEnrichments
    type: bool
    description: Add process information enrichments (can use more resources)

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      // Make sure sysmon is installed.
      LET _ &lt;= SELECT * FROM Artifact.Windows.Sysinternals.SysmonInstall(
         SysmonFileLocation=SysmonFileLocation)

      LET UpdateQuery =
            SELECT * FROM foreach(row={
              SELECT *,
                     get(member=&#x27;EventData&#x27;) AS EventData
              FROM watch_etw(guid=&#x27;{5770385f-c22a-43e0-bf4c-06f5698ffbd9}&#x27;)
            }, query={
              SELECT * FROM switch(
              start={
                SELECT EventData.ProcessId AS id,
                       EventData.ParentProcessId AS parent_id,
                       &quot;start&quot; AS update_type,

                       -- We need to manually build the dict here so
                       -- we can maintain column ordering.
                       dict(
                           Pid=EventData.ProcessId,
                           Ppid=EventData.ParentProcessId,
                           Name=split(sep_string=&quot;\\&quot;, string=EventData.Image)[-1],
                           StartTime=EventData.UtcTime,
                           EndTime=NULL,
                           Username=EventData.User,
                           Exe=EventData.Image,
                           CommandLine= EventData.CommandLine,
                           CurrentDirectory= EventData.CurrentDirectory,
                           FileVersion=EventData.FileVersion,
                           Description= EventData.Description,
                           Company= EventData.Company,
                           Product= EventData.Product,
                           ParentImage= EventData.ParentImage,
                           ParentCommandLine= EventData.ParentCommandLine,
                           TerminalSessionId= EventData.TerminalSessionId,
                           IntegrityLevel= EventData.IntegrityLevel,
                           Hashes=parse_string_with_regex(regex=[
                             &quot;SHA256=(?P&lt;SHA256&gt;[^,]+)&quot;,
                             &quot;MD5=(?P&lt;MD5&gt;[^,]+)&quot;,
                             &quot;IMPHASH=(?P&lt;IMPHASH&gt;[^,]+)&quot;],
                           string=EventData.Hashes)
                       ) AS data,
                       EventData.UtcTime AS start_time,
                       NULL AS end_time
                FROM scope()
                WHERE System.ID = 1
              },
              end={
                SELECT EventData.ProcessId AS id,
                       NULL AS parent_id,
                       &quot;exit&quot; AS update_type,
                       dict() AS data,
                       NULL AS start_time,
                       EventData.UtcTime AS end_time
                FROM scope()
                WHERE System.ID = 5
              })
            })

      LET SyncQuery =
              SELECT Pid AS id,
                 Ppid AS parent_id,
                 CreateTime AS start_time,
                 dict(
                   Name=Name,
                   Username=Username,
                   Exe=Exe,
                   CommandLine=CommandLine) AS data
              FROM pslist()

      LET Tracker &lt;= process_tracker(
         enrichments=if(condition=AddEnrichments, then=[
           &#x27;&#x27;&#x27;x=&gt;if(
                condition=NOT x.Data.VersionInformation AND x.Data.Image,
                then=dict(VersionInformation=parse_pe(file=x.Data.Image).VersionInformation))
           &#x27;&#x27;&#x27;,
           &#x27;&#x27;&#x27;x=&gt;if(
                condition=NOT x.Data.OriginalFilename OR x.Data.OriginalFilename = &#x27;-&#x27;,
                then=dict(OriginalFilename=x.Data.VersionInformation.OriginalFilename))
           &#x27;&#x27;&#x27;], else=[]),
        sync_query=SyncQuery, update_query=UpdateQuery, sync_period=60000)

      SELECT * FROM process_tracker_updates()
      WHERE update_type = &quot;stats&quot; OR AlsoForwardUpdates

</code></pre>

