---
title: Windows.EventLogs.EvtxHunter
hidden: true
tags: [Client Artifact]
---

This Artifact will hunt the Event Log message field for a regex value.
For example and IP, username or string.

Searching EventLog files is helpful for triage and scoping an incident.
The idea is a user can search for any IOC or other string of interest and
return all results across the Event Log ecosystem.

There are several parameter's available for search leveraging regex.
  - EvtxGlob glob of EventLogs to target. Default to all but can be targeted.
  - dateAfter enables search for events after this date.
  - dateBefore enables search for events before this date.
  - IocRegex enables regex search over the message field.
  - WhitelistRegex enables a regex whitelist for the Message field.
  - PathRegex enables filtering on evtx path for specific log targetting.
  - ChannelRegex allows specific EVTX Channel targets.
  - IdRegex enables a regex query to select specific event Ids.
  - SearchVSS enables searching over VSS

  Note: this artifact can potentially be heavy on the endpoint.
  Please use with caution.
  EventIds with an EventData field regex will be aplied and requires double
  escape for backslash due to serialisation of this field.
  E.g C:\\\\FOLDER\\\\binary\\.exe
  For EventIds with no EventData the Message field is queried and requires
  standard velociraptor escape. E.g C:\\FOLDER\\binary\\.exe


<pre><code class="language-yaml">
name: Windows.EventLogs.EvtxHunter
description: |
  This Artifact will hunt the Event Log message field for a regex value.
  For example and IP, username or string.

  Searching EventLog files is helpful for triage and scoping an incident.
  The idea is a user can search for any IOC or other string of interest and
  return all results across the Event Log ecosystem.

  There are several parameter&#x27;s available for search leveraging regex.
    - EvtxGlob glob of EventLogs to target. Default to all but can be targeted.
    - dateAfter enables search for events after this date.
    - dateBefore enables search for events before this date.
    - IocRegex enables regex search over the message field.
    - WhitelistRegex enables a regex whitelist for the Message field.
    - PathRegex enables filtering on evtx path for specific log targetting.
    - ChannelRegex allows specific EVTX Channel targets.
    - IdRegex enables a regex query to select specific event Ids.
    - SearchVSS enables searching over VSS

    Note: this artifact can potentially be heavy on the endpoint.
    Please use with caution.
    EventIds with an EventData field regex will be aplied and requires double
    escape for backslash due to serialisation of this field.
    E.g C:\\\\FOLDER\\\\binary\\.exe
    For EventIds with no EventData the Message field is queried and requires
    standard velociraptor escape. E.g C:\\FOLDER\\binary\\.exe

author: Matt Green - @mgreen27

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: EvtxGlob
    default: &#x27;%SystemRoot%\System32\Winevt\Logs\*.evtx&#x27;
  - name: IocRegex
    type: regex
    description: &quot;IOC Regex&quot;
    default:
  - name: WhitelistRegex
    description: &quot;Regex of string to witelist&quot;
    type: regex
  - name: PathRegex
    description: &quot;Event log Regex to enable filtering on path&quot;
    default: .
    type: regex
  - name: ChannelRegex
    description: &quot;Channel Regex to enable filtering on path&quot;
    default: .
  - name: ProviderRegex
    description: &quot;Provider Regex to enable filtering on provider&quot;
    default: .
    type: regex
  - name: IdRegex
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
  - name: DateAfter
    type: timestamp
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ssZ&quot;
  - name: DateBefore
    type: timestamp
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ssZ&quot;

sources:
  - query: |
      LET VSS_MAX_AGE_DAYS &lt;= VSSAnalysisAge
      LET Accessor = if(condition=VSSAnalysisAge &gt; 0, then=&quot;ntfs_vss&quot;, else=&quot;auto&quot;)

      -- firstly set timebounds for performance
      LET DateAfterTime &lt;= if(condition=DateAfter,
        then=timestamp(epoch=DateAfter), else=timestamp(epoch=&quot;1600-01-01&quot;))
      LET DateBeforeTime &lt;= if(condition=DateBefore,
        then=timestamp(epoch=DateBefore), else=timestamp(epoch=&quot;2200-01-01&quot;))

      -- expand provided glob into a list of paths on the file system (fs)
      LET fspaths = SELECT OSPath
        FROM glob(globs=expand(path=EvtxGlob), accessor=Accessor)
        WHERE OSPath =~ PathRegex

      -- function returning IOC hits
      LET evtxsearch(PathList) = SELECT * FROM foreach(
            row=PathList,
            query={
                SELECT
                    timestamp(epoch=int(int=System.TimeCreated.SystemTime)) AS EventTime,
                    System.Computer as Computer,
                    System.Channel as Channel,
                    System.Provider.Name as Provider,
                    System.EventID.Value as EventID,
                    System.EventRecordID as EventRecordID,
                    System.Security.UserID as UserSID,
                    lookupSID(sid=System.Security.UserID) as Username,
                    get(field=&quot;EventData&quot;) as EventData,
                    get(field=&quot;UserData&quot;) as UserData,
                    get(field=&quot;Message&quot;) as Message,
                    OSPath
                FROM parse_evtx(filename=OSPath, accessor=Accessor)
                WHERE ( EventData OR UserData OR Message )
                    AND EventTime &lt; DateBeforeTime
                    AND EventTime &gt; DateAfterTime
                    AND Channel =~ ChannelRegex
                    AND Provider =~ ProviderRegex
                    AND str(str=EventID) =~ IdRegex
                    AND format(format=&#x27;%v %v %v&#x27;, args=[
                               EventData, UserData, Message]) =~ IocRegex
                    AND if(condition=WhitelistRegex,
                        then= NOT format(format=&#x27;%v %v %v&#x27;, args=[
                               EventData, UserData, Message]) =~ WhitelistRegex,
                        else= True)
            }
          )

        SELECT * FROM evtxsearch(PathList=fspaths)
        GROUP BY EventRecordID, Channel

</code></pre>

