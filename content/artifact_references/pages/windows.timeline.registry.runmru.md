---
title: Windows.Timeline.Registry.RunMRU
hidden: true
tags: [Client Artifact]
---

# Output all available RunMRU registry keys in timeline format.

RunMRU is when a user enters a command into the START > Run prompt.
Entries will be logged in the user hive under:    Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU

The artifact numbers all entries with the most recent at
reg_mtime starting at 0. Second recent 1, Third recent 2 etc.

Default output enables a line per MRU entry.
A tickbox enables Grouped results with order in a single line.

Note: This artifact will collect RunMRU from ntuser.dat files and
may exclude very recent entries in transaction (HKCU).  Future
versions of this content will address this gap.


<pre><code class="language-yaml">
name: Windows.Timeline.Registry.RunMRU
description: |
    # Output all available RunMRU registry keys in timeline format.

    RunMRU is when a user enters a command into the START &gt; Run prompt.
    Entries will be logged in the user hive under:    Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU

    The artifact numbers all entries with the most recent at
    reg_mtime starting at 0. Second recent 1, Third recent 2 etc.

    Default output enables a line per MRU entry.
    A tickbox enables Grouped results with order in a single line.

    Note: This artifact will collect RunMRU from ntuser.dat files and
    may exclude very recent entries in transaction (HKCU).  Future
    versions of this content will address this gap.

author: Matt Green - @mgreen27

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: KeyGlob
    type: hidden
    default: Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU\MRUList
  - name: dateAfter
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: dateBefore
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ss Z&quot;
    type: timestamp
  - name: targetUser
    description: &quot;target user regex&quot;
    type: regex
  - name: regexValue
    description: &quot;regex search over RunMRU values.&quot;
    type: regex
  - name: groupResults
    description: &quot;groups MRU entries to one message line&quot;
    type: bool

sources:
 - query: |
        LET hostname_lu &lt;= SELECT Fqdn FROM info()
        LET HKEY_USERS &lt;= pathspec(parse=&quot;HKEY_USERS&quot;, path_type=&quot;registry&quot;)

        // First we need to extract populated RunMRU
        LET MRUList &lt;= SELECT OSPath,
           Data.value as RunMruOrder,
           len(list=Data.value) as RunMruLength,
           Username,
           UUID
        FROM Artifact.Windows.Registry.NTUser(KeyGlob=KeyGlob)

        // Now extract RunMRU entries and order
        LET results &lt;= SELECT * FROM foreach(
           row=MRUList,
           query={
             SELECT
                OSPath.DelegatePath as source,
                Username,
                Mtime as reg_mtime,
                OSPath.Basename as reg_name,
                HKEY_USERS + UUID + OSPath.Dirname.Path as reg_key,

                -- Value data is similar to &#x27;cmd.exe\1&#x27; so we just need the bit before the \
                regex_replace(source=Data.value, re=&quot;\\\\1$&quot;, replace=&quot;&quot;) as reg_value,
                Data.type as reg_type,
                RunMruLength - 1 - len(list=regex_replace(
                   source=RunMruOrder,
                   re=&quot;^.*&quot; + OSPath.Basename,
                   replace=&quot;&quot;)) as mru_order,
                RunMruOrder
             FROM glob(globs=&#x27;*&#x27;, root=OSPath.Dirname, accessor=&quot;raw_reg&quot;)
             WHERE not reg_name = &quot;MRUList&quot; AND
                    if(condition=targetUser, then=Username =~ targetUser,
                        else=TRUE) AND
                    if(condition=dateAfter, then=reg_mtime &gt; timestamp(string=dateAfter),
                        else=TRUE) AND
                    if(condition=dateBefore, then=reg_mtime &lt; timestamp(string=dateBefore),
                        else=TRUE)
                    AND log(message=UUID)
             ORDER BY mru_order
          })

        // join mru values and order for presentation
        LET usercommands &lt;= SELECT Username as user, mru_order,
                format(format=&quot;MRU%v: %v&quot;, args=[mru_order,reg_value]) as mru_grouped
        FROM results

        // Prepare join use case
        LET joinOut = SELECT
                reg_mtime as event_time,
                hostname_lu[0].Fqdn as hostname,
                &quot;RunMRU&quot; as parser,
                &quot;RunMRU evidence user: &quot; + Username + &quot;, &quot; +
                  join(array=mru_grouped, sep=&quot; | &quot;)  + &quot;&#x27;&quot; as message,
                source,
                Username as user
        FROM foreach(row=usercommands,
            query={
                SELECT *, Username,
                    {
                        SELECT mru_grouped
                        FROM usercommands
                        WHERE user = Username
                        ORDER BY mru_grouped
                    } as mru_grouped
                FROM results
                ORDER BY mru_grouped
            })
        GROUP BY source

        // Prepare split use case
        LET splitOut = SELECT
                    reg_mtime as event_time,
                    hostname_lu.Fqdn[0] as hostname,
                    &quot;RunMRU&quot; as parser,
                    &quot;RunMRU evidence user: &quot; + Username +
                        format(format=&quot;, order: %v, command: %v&quot;, args=[mru_order,reg_value])
                            + &quot;&#x27;&quot; as message,
                    source,
                    Username as user,
                    reg_key,
                    reg_mtime,
                    reg_name,
                    reg_value,
                    reg_type
            FROM results

        // Print out chosen usecase
        SELECT *
        FROM if(condition=groupResults,
            then={ SELECT * FROM joinOut},
            else={ SELECT * FROM splitOut})
        WHERE if(condition=regexValue, then=message =~ regexValue, else=TRUE)

</code></pre>

