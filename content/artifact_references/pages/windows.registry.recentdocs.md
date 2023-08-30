---
title: Windows.Registry.RecentDocs
hidden: true
tags: [Client Artifact]
---

This artifact extracts RecentDocs MRU from the target.

By default the artifact will target all users on the machine when run in
live mode but can be targeted directly using the HiveGlob parameter.

Output includes LastWriteTime of key and a list of MRU items in the
order specified in the MRUListEx key value.
MruEntries has the format: [KeyName] := [Parsed Key value]

Available filters include:
    - Time bounds to select LastWrite timestamp within time ranges.
    - EntryRegex to target specific entry values
    - UserRegex to target specific users. Note: this filter does not work
    when using HiveGlob.
    - SidRegex to target a specific SID.

Note: both UserRegex and SidRegex does not work when using HiveGlob
     and all MRU will be returned.


<pre><code class="language-yaml">
name: Windows.Registry.RecentDocs
author: Matt Green - @mgreen27
description: |
    This artifact extracts RecentDocs MRU from the target.

    By default the artifact will target all users on the machine when run in
    live mode but can be targeted directly using the HiveGlob parameter.

    Output includes LastWriteTime of key and a list of MRU items in the
    order specified in the MRUListEx key value.
    MruEntries has the format: [KeyName] := [Parsed Key value]

    Available filters include:
        - Time bounds to select LastWrite timestamp within time ranges.
        - EntryRegex to target specific entry values
        - UserRegex to target specific users. Note: this filter does not work
        when using HiveGlob.
        - SidRegex to target a specific SID.

    Note: both UserRegex and SidRegex does not work when using HiveGlob
         and all MRU will be returned.

parameters:
  - name: KeyGlob
    type: hidden
    default: Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs\**
  - name: HiveGlob
    description: &quot;optional hive glob to target for offline processing.&quot;
  - name: DateAfter
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ssZ&quot;
    type: timestamp
  - name: DateBefore
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ssZ&quot;
    type: timestamp
  - name: EntryRegex
    default: .
    description: &quot;regex filter for document/entry name.&quot;
  - name: UserRegex
    default: .
    description: &quot;regex filter for username over standard query.&quot;
  - name: SidRegex
    default: .
    description: &quot;regex filter for user SID over standard query.&quot;
  - name: Profile
    type: hidden
    default: |
        [
            [&quot;Target&quot;, 0, [
              [&quot;Filename&quot;, 0, &quot;String&quot;, {
                  encoding: &quot;utf16&quot;,
              }],
            ]]
        ]

sources:
 - query: |
      -- time testing
      LET time_test(stamp) =
            if(condition= DateBefore AND DateAfter,
                then= stamp &lt; DateBefore AND stamp &gt; DateAfter,
                else=
            if(condition=DateBefore,
                then= stamp &lt; DateBefore,
                else=
            if(condition= DateAfter,
                then= stamp &gt; DateAfter,
                else= True
            )))


      -- dynamic function to extract RecentDocs order from MRUListEx data value
      LET find_order(value) = SELECT
            parse_binary(accessor=&#x27;data&#x27;,
                filename=substr(str=value,start=_value,end=_value + 4),
                struct=&#x27;uint32&#x27;) as Int
        FROM range(end=len(list=value),start=0,step=4)
        WHERE NOT Int = 4294967295

      -- NTUser method is most accurate
      LET NTUserValues = SELECT
            Mtime,
            OSPath.Components[-2] AS Type,
            OSPath.Components[-1] AS Name,
            if(condition= OSPath.Basename = &#x27;MRUListEx&#x27;,
               then= find_order(value=Data.value).Int,
               else= parse_binary(
                  accessor=&quot;data&quot;,
                  filename=Data.value,
                  profile=Profile, struct=&quot;Target&quot;).Filename ) as Value,
            Data,
            OSPath.DelegatePath as HiveName,
            OSPath,
            Username,
            UUID
        FROM Artifact.Windows.Registry.NTUser(KeyGlob=KeyGlob)
        WHERE Username =~ UserRegex
            AND UUID =~ SidRegex
            AND Data.type =~ &#x27;BINARY&#x27;


      -- Glob method allows offline processing but can not filter by user
      LET GlobValues = SELECT
            Mtime,
            OSPath.Components[-2] AS Type,
            OSPath.Components[-1] AS Name,
            if(condition= OSPath.Basename = &#x27;MRUListEx&#x27;,
               then= find_order(value=Data.value).Int,
               else= parse_binary(
                  accessor=&quot;data&quot;,
                  filename=Data.value,
                  profile=Profile,
                  struct=&quot;Target&quot;).Filename ) as Value,
            Data,
            OSPath.DelegatePath as HiveName,
            OSPath
        FROM glob(
           globs=KeyGlob,
           root=pathspec(DelegatePath=HiveGlob),
           accessor=&quot;raw_reg&quot;)
        WHERE Data.type =~ &#x27;BINARY&#x27;

      -- precalculate all hive values for performance
      LET AllValues &lt;= SELECT * FROM if(condition= HiveGlob,
                                        then={ SELECT * FROM GlobValues},
                                        else={ SELECT * FROM NTUserValues} )
            WHERE time_test(stamp=Mtime)


      -- memorise for lookup / performance
      LET Items &lt;= memoize(query={
            SELECT Type, Name, Value,
                Type + &#x27;:&#x27; + Name + &#x27;:&#x27; + HiveName  AS Key
            FROM AllValues
        }, key=&quot;Key&quot;)


      -- flattern output then add lookup of processed data
      LET flat_data(type,hivename) = SELECT *,
            str(str=Value) + &#x27; := &#x27; +
              get(item=Items, field=str(str=Type) + &#x27;:&#x27; +
              str(str=Value) + &#x27;:&#x27; + str(str=hivename) ).Value  AS Value
        FROM flatten(query={
            SELECT Mtime, Type, Name, Value,HiveName
            FROM AllValues
            WHERE Name = &#x27;MRUListEx&#x27;
            AND Type = type AND HiveName = hivename
          })
         GROUP BY Value


      -- prep results
      LET results = SELECT Mtime as LastWriteTime, Type,
            flat_data(type=Type, hivename=HiveName).Value as MruEntries,
            OSPath.Path as Key,
            HiveName,
            if(condition=HiveGlob,
                then=&#x27;&#x27;, else=Username) as Username,
            if(condition=HiveGlob,
                then=&#x27;&#x27;, else=UUID) as UUID
          FROM AllValues
          WHERE Name = &#x27;MRUListEx&#x27;


      -- print rows, remove Username/SID from offline
      SELECT * FROM if(condition=HiveGlob,
        then = {
            SELECT LastWriteTime, Type,
                if(condition= NOT MruEntries[0],
                    then= Null,
                    else= MruEntries) as MruEntries,
                Key, HiveName
            FROM results
        },
        else={
            SELECT LastWriteTime, Type,
                if(condition= NOT MruEntries[0],
                    then= Null,
                    else= MruEntries) as MruEntries,
                Key, HiveName, Username, UUID
            FROM results
        })
      WHERE format(format=&#x27;%v&#x27;, args=MruEntries) =~ EntryRegex

</code></pre>

