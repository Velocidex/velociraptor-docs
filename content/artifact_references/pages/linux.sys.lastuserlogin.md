---
title: Linux.Sys.LastUserLogin
hidden: true
tags: [Client Artifact]
---

Find and parse system wtmp files. This indicate when the user last logged in.

<pre><code class="language-yaml">
name: Linux.Sys.LastUserLogin
description: Find and parse system wtmp files. This indicate when the
             user last logged in.
parameters:
  - name: wtmpGlobs
    default: /var/log/wtmp*

  - name: MaxCount
    default: 10000
    type: int64

export: |
  LET wtmpProfile &lt;= &#x27;&#x27;&#x27;
  [
    [&quot;Header&quot;, 0, [

    [&quot;records&quot;, 0, &quot;Array&quot;, {
        &quot;type&quot;: &quot;utmp&quot;,
        &quot;count&quot;: &quot;x=&gt;MaxCount&quot;,
        &quot;max_count&quot;: &quot;x=&gt;MaxCount&quot;,
    }],
    ]],
    [&quot;utmp&quot;, 384, [
        [&quot;ut_type&quot;, 0, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;short int&quot;,
            &quot;choices&quot;: {
               &quot;0&quot;: &quot;EMPTY&quot;,
               &quot;1&quot;: &quot;RUN_LVL&quot;,
               &quot;2&quot;: &quot;BOOT_TIME&quot;,
               &quot;5&quot;: &quot;INIT_PROCESS&quot;,
               &quot;6&quot;: &quot;LOGIN_PROCESS&quot;,
               &quot;7&quot;: &quot;USER_PROCESS&quot;,
               &quot;8&quot;: &quot;DEAD_PROCESS&quot;
             }
          }],
        [&quot;ut_pid&quot;, 4, &quot;int&quot;],
        [&quot;ut_terminal&quot;, 8, &quot;String&quot;, {&quot;length&quot;: 32}],
        [&quot;ut_terminal_identifier&quot;, 40, &quot;String&quot;, {&quot;length&quot;: 4}],
        [&quot;ut_user&quot;, 44, &quot;String&quot;, {&quot;length&quot;: 32}],
        [&quot;ut_hostname&quot;, 76, &quot;String&quot;, {&quot;length&quot;: 256}],
        [&quot;ut_termination_status&quot;, 332, &quot;int&quot;],
        [&quot;ut_exit_status&quot;, 334, &quot;int&quot;],
        [&quot;ut_session&quot;, 336, &quot;int&quot;],
        [&quot;ut_timestamp&quot;, 340, &quot;int32&quot;],
        [&quot;ut_ip_address&quot;, 348, &quot;int64&quot;],
    ]
    ]
    ]]
    ]&#x27;&#x27;&#x27;

sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;
    query: |
      LET parsed = SELECT OSPath, parse_binary(
                   filename=OSPath,
                   profile=wtmpProfile,
                   struct=&quot;Header&quot;
                 ) AS Parsed
      FROM glob(globs=split(string=wtmpGlobs, sep=&quot;,&quot;))
      SELECT * FROM foreach(row=parsed,
      query={
         SELECT * FROM foreach(row=Parsed.records,
         query={
           SELECT OSPath, ut_type AS Type,
              ut_id AS ID,
              ut_pid as PID,
              ut_hostname as Host,
              ut_user as User,
              ip(netaddr4_le=ut_ip_address) AS IpAddr,
              ut_terminal as Terminal,
              timestamp(epoch=ut_timestamp) as login_time
          FROM scope()
        })
      }) WHERE Type != &quot;EMPTY&quot; AND PID != 0

</code></pre>

