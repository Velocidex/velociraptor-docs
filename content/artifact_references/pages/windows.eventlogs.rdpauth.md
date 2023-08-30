---
title: Windows.EventLogs.RDPAuth
hidden: true
tags: [Client Artifact]
---

This artifact will extract Event Logs related to Remote Desktop sessions,
logon and logoff.

Security channel - EventID in 4624,4634 AND LogonType 3, 7, or 10.
Security channel - EventID in 4778,4625,4779, or 4647.
System channel -  EventID 9009.
Microsoft-Windows-TerminalServices-RemoteConnectionManager/Operational - EventID 1149.
Microsoft-Windows-TerminalServices-LocalSessionManager/Operational - EventID 23,22,21,24,25,39, or 40.

Best use of this artifact is to collect RDP and Authentication events around
a timeframe of interest and order by EventTime to scope RDP activity.


<pre><code class="language-yaml">
name: Windows.EventLogs.RDPAuth
author: &quot;Matt Green - @mgreen27&quot;
description: |
    This artifact will extract Event Logs related to Remote Desktop sessions,
    logon and logoff.

    Security channel - EventID in 4624,4634 AND LogonType 3, 7, or 10.
    Security channel - EventID in 4778,4625,4779, or 4647.
    System channel -  EventID 9009.
    Microsoft-Windows-TerminalServices-RemoteConnectionManager/Operational - EventID 1149.
    Microsoft-Windows-TerminalServices-LocalSessionManager/Operational - EventID 23,22,21,24,25,39, or 40.

    Best use of this artifact is to collect RDP and Authentication events around
    a timeframe of interest and order by EventTime to scope RDP activity.

reference:
  - https://ponderthebits.com/2018/02/windows-rdp-related-event-logs-identification-tracking-and-investigation/

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: Security
    description: path to Security event log.
    default: &#x27;%SystemRoot%\System32\Winevt\Logs\Security.evtx&#x27;
  - name: System
    description: path to System event log.
    default: &#x27;%SystemRoot%\System32\Winevt\Logs\System.evtx&#x27;
  - name: LocalSessionManager
    description: path to TerminalServices-LocalSessionManager operational event log.
    default: &#x27;%SystemRoot%\System32\Winevt\Logs\Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx&#x27;
  - name: RemoteConnectionManager
    description: path to TerminalServices-RemoteConnectionManager operational event log.
    default: &#x27;%SystemRoot%\System32\Winevt\Logs\Microsoft-Windows-TerminalServices-RemoteConnectionManager%4Operational.evtx&#x27;
  - name: DateAfter
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: DateBefore
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: SourceIPRegex
    default: &quot;.+&quot;
    type: regex
  - name: UserNameRegex
    default: &quot;.+&quot;
    type: regex
  - name: UserNameWhitelist
    default: &#x27;\$$&#x27;
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

      -- firstly set timebounds for performance
      LET DateAfterTime &lt;= if(condition=DateAfter,
        then=DateAfter, else=timestamp(epoch=&quot;1600-01-01&quot;))
      LET DateBeforeTime &lt;= if(condition=DateBefore,
        then=DateBefore, else=timestamp(epoch=&quot;2200-01-01&quot;))

      -- expand provided glob into a list of paths on the file system (fs)
      LET fspaths &lt;= SELECT OSPath
        FROM glob(globs=[
            expand(path=Security),
            expand(path=System),
            expand(path=LocalSessionManager),
            expand(path=RemoteConnectionManager)], accessor=Accessor)

      -- function returning query hits
      LET evtxsearch(PathList) = SELECT * FROM foreach(
            row=PathList,
            query={
                SELECT
                    timestamp(epoch=int(int=System.TimeCreated.SystemTime)) AS EventTime,
                    System.Computer as Computer,
                    System.Channel as Channel,
                    System.EventID.Value as EventID,
                    if(condition= System.Channel=&#x27;Security&#x27;,
                        then= EventData.TargetDomainName,
                        else= if(condition= UserData.EventXML.User,
                            then= split(string=UserData.EventXML.User,sep=&#x27;\\\\&#x27;)[0],
                            else= if(condition= UserData.EventXML.Param2,
                                then= UserData.EventXML.Param2,
                                else= &#x27;null&#x27; ))) as DomainName,
                    if(condition= System.Channel=&#x27;Security&#x27;,
                        then= EventData.TargetUserName,
                        else= if(condition= UserData.EventXML.User,
                            then= split(string=UserData.EventXML.User,sep=&#x27;\\\\&#x27;)[1],
                            else= if(condition= UserData.EventXML.Param1,
                                then= UserData.EventXML.Param1,
                                else= &#x27;null&#x27; ))) as UserName,
                    if(condition= System.Channel=&#x27;Security&#x27;,
                        then= if(condition= EventData.LogonType,
                            then= EventData.LogonType,
                            else= &#x27;null&#x27; ),
                        else= &#x27;null&#x27; ) as LogonType,
                    if(condition= System.Channel=&#x27;Security&#x27;,
                        then= if(condition= EventData.IpAddress,
                            then= EventData.IpAddress,
                            else= &#x27;null&#x27; ),
                        else= if(condition= System.Channel=~&#x27;TerminalServices&#x27;,
                            then= if(condition= UserData.EventXML.Address,
                                then= UserData.EventXML.Address,
                                else= if(condition= UserData.EventXML.Param3,
                                    then= UserData.EventXML.Param3,
                                    else= &#x27;null&#x27;)),
                            else= &#x27;null&#x27; )) as SourceIP,
                    if(condition= System.Channel=~&#x27;TerminalServices|System&#x27;,
                        then=
                            get(item=dict(
                                `21`=&#x27;RDP_LOCAL_CONNECTED&#x27;,
                                `22`=&#x27;RDP_REMOTE_CONNECTED&#x27;,
                                `23`=&#x27;RDP_SESSION_LOGOFF&#x27;,
                                `24`=&#x27;RDP_LOCAL_DISCONNECTED&#x27;,
                                `25`=&#x27;RDP_REMOTE_RECONNECTION&#x27;,
                                `39`=&#x27;RDP_REMOTE_DISCONNECTED_FORMAL&#x27;,
                                `40`=&#x27;RDP_REMOTE_DISCONNECTED_REASON&#x27;,
                                `1149`=&#x27;RDP_INITIATION_SUCCESSFUL&#x27;,
                                `9009`=&#x27;DESKTOPWINDOWMANAGER_CLOSED&#x27;),
                                    member=str(str=System.EventID.Value)),
                        else=if(condition= System.EventID.Value = 4624 AND EventData.LogonType = 10,
                            then=&#x27;RDP_LOGON_SUCCESSFUL_NEW&#x27;,
                        else=if(condition= System.EventID.Value = 4624 AND EventData.LogonType = 3,
                            then=&#x27;LOGON_SUCCESSFUL&#x27;,
                        else=if(condition= System.EventID.Value = 4624 AND EventData.LogonType = 7,
                            then=&#x27;LOGON_SUCCESSFUL_OLD&#x27;,
                        else=if(condition= System.EventID.Value = 4625 AND EventData.LogonType = 3,
                            then=&#x27;LOGON_FAILED&#x27;,
                        else=if(condition= System.EventID.Value = 4625 AND EventData.LogonType = 10,
                            then=&#x27;RDP_LOGON_FAILED&#x27;,
                        else=
                            get(item=dict(
                                `4778`=&#x27;LOGON_RECONNECT_EXISTING&#x27;,
                                `4779`=&#x27;SESSION_DISCONNECT&#x27;,
                                `4647`=&#x27;USER_INITIATED_LOGOFF&#x27;,
                                `4634`=&#x27;LOGOFF_DISCONNECT&#x27;),
                                    member=str(str=System.EventID.Value)
                        ))))))) as Description,
                    get(field=&quot;Message&quot;) as Message,
                    System.EventRecordID as EventRecordID,
                    OSPath
                FROM parse_evtx(filename=OSPath, accessor=Accessor)
                WHERE
                    ( Channel = &#x27;Security&#x27;
                        AND ( (EventID in (4624,4634) AND LogonType in (3,10,7))
                            OR EventID in (4778,4625,4779,4647)))
                    OR ( Channel = &#x27;System&#x27; AND EventID = 9009 )
                    OR ( Channel = &#x27;Microsoft-Windows-TerminalServices-RemoteConnectionManager/Operational&#x27;
                        AND EventID = 1149 )
                    OR ( Channel = &#x27;Microsoft-Windows-TerminalServices-LocalSessionManager/Operational&#x27;
                        AND EventID in (23,22,21,24,25,39,40))
                    AND EventTime &lt; DateBeforeTime
                    AND EventTime &gt; DateAfterTime
                    AND if(condition= UserNameWhitelist,
                        then= NOT UserName =~ UserNameWhitelist,
                        else= True)
                    AND UserName =~ UserNameRegex
                    AND SourceIP =~ SourceIPRegex
            }
          )

      SELECT * FROM if(condition=VSSAnalysisAge &gt; 0,
      then={
        SELECT * FROM evtxsearch(PathList=fspaths)
        GROUP BY EventRecordID, Channel
      }, else={
        SELECT * FROM evtxsearch(PathList=fspaths)
      })

</code></pre>

