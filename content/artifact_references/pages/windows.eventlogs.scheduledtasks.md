---
title: Windows.EventLogs.ScheduledTasks
hidden: true
tags: [Client Artifact]
---

This artifact will extract Event Logs related to ScheduledTasks and provide
a nice format for simplified review.

Adversaries may abuse tasks for execution, persistence, lateral movement or
privilege escalation. This artifact collates all events from
Microsoft-Windows-TaskScheduler/Operational event log channel and scheduled
task events from the Security log if configured.

A common hunting use case may be collection all deleted scheduled tasks (EID 141),
all modified scheduled tasks (EID 140) then run frequency analysis and chase
down any abnormalities for the environment. Similarly task execution (EID 129)
and registration (EID 106) can be a good collection hunting for unusual paths.

Pivoting can be via either: TaskSchedulerEventRegex, TaskName or IOC Regex
(e.g taskname|delete|created|update)

Note: Audit Other Object Access Events is required to be implemented to record
scheduled tasks being registered, modified or disabled in the Security event
log channel.
See: Computer Configuration\Policies\Windows Settings\Security Settings\Advanced Audit Policy Configuration\Object Access


<pre><code class="language-yaml">
name: Windows.EventLogs.ScheduledTasks
description: |
  This artifact will extract Event Logs related to ScheduledTasks and provide
  a nice format for simplified review.

  Adversaries may abuse tasks for execution, persistence, lateral movement or
  privilege escalation. This artifact collates all events from
  Microsoft-Windows-TaskScheduler/Operational event log channel and scheduled
  task events from the Security log if configured.

  A common hunting use case may be collection all deleted scheduled tasks (EID 141),
  all modified scheduled tasks (EID 140) then run frequency analysis and chase
  down any abnormalities for the environment. Similarly task execution (EID 129)
  and registration (EID 106) can be a good collection hunting for unusual paths.

  Pivoting can be via either: TaskSchedulerEventRegex, TaskName or IOC Regex
  (e.g taskname|delete|created|update)

  Note: Audit Other Object Access Events is required to be implemented to record
  scheduled tasks being registered, modified or disabled in the Security event
  log channel.
  See: Computer Configuration\Policies\Windows Settings\Security Settings\Advanced Audit Policy Configuration\Object Access

author: &quot;@mgreen27 - Matt Green&quot;

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

reference:
  - https://attack.mitre.org/techniques/T1053/005/
  - https://mnaoumov.wordpress.com/2014/05/15/task-scheduler-event-ids/

parameters:
  - name: Security
    description: path to Security event log.
    default: &#x27;%SystemRoot%\System32\Winevt\Logs\Security.evtx&#x27;
  - name: TaskScheduler
    description: path to the TaskScheduler/Operational event log
    default: &#x27;%SystemRoot%\System32\Winevt\Logs\Microsoft-Windows-TaskScheduler%4Operational.evtx&#x27;
  - name: DateAfter
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: DateBefore
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: TaskSchedulerEventRegex
    description: Regex of TaskScheduler log event ids.
    type: regex
    default: .
  - name: SecurityEventRegex
    description: regex of Security log event ids.
    type: regex
    default: &#x27;^(4698|4699|4700|4701|4702)$&#x27;
  - name: TaskNameRegex
    description: regex of target task name.
    default: .
    type: regex
  - name: TaskNameWhitelist
    description: regex of task names to exclude from results.
    default:
    type: regex
  - name: TaskActionRegex
    description: regex of target task execution process / path.
    default: .
    type: regex
  - name: TaskActionWhitelist
    description: regex of task processes to exclude from results.
    default:
    type: regex
  - name: UserNameRegex
    description: regex of target user name.
    default: .
    type: regex
  - name: IocRegex
    description: IOC regex to search for.
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
      LET Accessor = if(condition=VSSAnalysisAge &gt; 0, then=&quot;ntfs_vss&quot;, else=&quot;auto&quot;)

      -- firstly set timebounds for performance
      LET DateAfterTime &lt;= if(condition=DateAfter,
        then=DateAfter, else=timestamp(epoch=&quot;1600-01-01&quot;))
      LET DateBeforeTime &lt;= if(condition=DateBefore,
        then=DateBefore, else=timestamp(epoch=&quot;2200-01-01&quot;))

      -- Lookup what each task ID means (sadly dict keys are always strings).
      LET TaskIDLookup &lt;= dict(
        `4698`=&quot;A scheduled task was created.&quot;,
        `4699`=&quot;A scheduled task was deleted.&quot;,
        `4700`=&quot;A scheduled task was enabled.&quot;,
        `4701`=&quot;A scheduled task was disabled.&quot;,
        `4702`=&quot;A scheduled task was updated.&quot;)

      -- expand provided glob into a list of paths on the file system (fs)
      LET fspaths = SELECT OSPath
        FROM glob(globs=[expand(path=Security), expand(path=TaskScheduler)],
        accessor=Accessor)

      -- function to parse task content and replace xml in EventData
      LET parse_task(data) = dict(
         SubjectUserSid=data.SubjectUserSid,
         SubjectUserName=data.SubjectUserName,
         SubjectDomainName=data.SubjectDomainName,
         SubjectLogonId=data.SubjectLogonId,
         TaskName=data.TaskName,
         TaskContent=parse_xml(
            accessor=&#x27;data&#x27;,
            file=regex_replace(
              source= if(condition= data.TaskContentNew,
                 then= data.TaskContentNew,
                 else= if(condition= data.TaskContent,
                    then= data.TaskContent)),
                       re=&#x27;&lt;[?].+?&gt;&#x27;,
                       replace=&#x27;&#x27;)).Task,

         ClientProcessStartKey=data.ClientProcessStartKey,
         ClientProcessId=data.ClientProcessId,
         ParentProcessId=data.ParentProcessId,
         RpcCallClientLocality=data.RpcCallClientLocality,
         FQDN=data.FQDN)


      -- function returning query hits
      LET evtxsearch(PathList) = SELECT * FROM foreach(
            row=PathList,
            query={
                SELECT
                    timestamp(epoch=int(int=System.TimeCreated.SystemTime)) AS EventTime,
                    System.Computer as Computer,
                    System.Channel as Channel,
                    System.EventID.Value as EventID,
                    System.EventRecordID as EventRecordID,
                    if(condition=EventData.UserName,
                        then= EventData.UserName,
                        else= if(condition=EventData.UserContext,
                            then=EventData.UserContext,
                            else= if(condition=EventData.SubjectUserName,
                                then= EventData.SubjectDomainName + &#x27;\\&#x27; + EventData.SubjectUserName,
                                else= &#x27;N/A&#x27; ))) as UserName,
                    if(condition=EventData.TaskName,
                        then= EventData.TaskName) as TaskName,
                    if(condition=EventData.ActionName,
                        then= EventData.ActionName,
                        else= if(condition=EventData.Path,
                            then= EventData.Path,
                            else= &#x27;N/A&#x27; )) as TaskAction,
                    if(condition=EventData.TaskContent OR EventData.TaskContentNew,
                            then= parse_task(data=EventData),
                            else= EventData) as EventData,
                    get(field=&quot;Message&quot;) as Message,
                    OSPath
                FROM parse_evtx(filename=OSPath, accessor=Accessor)
                WHERE
                    (( Channel = &#x27;Microsoft-Windows-TaskScheduler/Operational&#x27;
                        AND str(str=EventID) =~ TaskSchedulerEventRegex )
                    OR ( Channel = &#x27;Security&#x27;
                        AND str(str=EventID) =~ SecurityEventRegex ))
                    AND TaskName =~ TaskNameRegex
                    AND NOT if(condition= TaskNameWhitelist,
                        then= TaskName =~ TaskNameWhitelist,
                        else= False)
                    AND TaskAction =~ TaskActionRegex
                    AND NOT if(condition= TaskActionWhitelist,
                        then= TaskName =~ TaskActionWhitelist,
                        else= False)
                    AND UserName =~ UserNameRegex
                    AND format(format=&#x27;%v %v %v %v&#x27;, args=[
                            EventData, UserData, Message, System]) =~ IocRegex
                    AND EventTime &gt;= DateAfterTime AND EventTime &lt;= DateBeforeTime
            }
          )

      SELECT
        EventTime,
        Computer,
        Channel,
        EventID,
        EventRecordID,
        UserName,
        TaskName,
        if(condition= Channel = &#x27;Microsoft-Windows-TaskScheduler/Operational&#x27;,
            then= Message,
            else=get(item=TaskIDLookup, member=str(str=EventID))) as Message,
        if(condition= EventID =~&#x27;^(4698|4699|4700|4701|4702)$&#x27;,
        then= if(condition= EventData.TaskContent.Actions,
            then= if(condition= EventData.TaskContent.Actions.Exec,
                then= if(condition= EventData.TaskContent.Actions.Exec.Arguments,
                    then= EventData.TaskContent.Actions.Exec.Command + &#x27; &#x27; + EventData.TaskContent.Actions.Exec.Arguments,
                    else=  EventData.TaskContent.Actions.Exec.Command),
                else= if(condition=EventData.TaskContent.Actions.ComHandler.ClassId,
                    then= &#x27;ClassId: &#x27; + EventData.TaskContent.Actions.ComHandler.ClassId))),
            else= TaskAction) as TaskAction,
        EventData,
        OSPath
      FROM evtxsearch(PathList=fspaths)

</code></pre>

