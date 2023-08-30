---
title: Linux.Events.ProcessExecutions
hidden: true
tags: [Client Event Artifact]
---

This artifact collects process execution logs from the Linux kernel.

This artifact relies on the presence of `auditctl` usually included
in the auditd package. On Ubuntu you can install it using:

```
apt-get install auditd
```


<pre><code class="language-yaml">
name: Linux.Events.ProcessExecutions
description: |
  This artifact collects process execution logs from the Linux kernel.

  This artifact relies on the presence of `auditctl` usually included
  in the auditd package. On Ubuntu you can install it using:

  ```
  apt-get install auditd
  ```

precondition: SELECT OS From info() where OS = &#x27;linux&#x27;

type: CLIENT_EVENT

required_permissions:
  - EXECVE

parameters:
  - name: pathToAuditctl
    default: /sbin/auditctl
    description: We depend on auditctl to install the correct process execution rules.

sources:
  - query: |
     // Install the auditd rule if possible.
     LET _ &lt;= SELECT * FROM execve(argv=[pathToAuditctl, &quot;-a&quot;,
          &quot;exit,always&quot;, &quot;-F&quot;, &quot;arch=b64&quot;, &quot;-S&quot;, &quot;execve&quot;, &quot;-k&quot;, &quot;procmon&quot;])

     LET exec_log = SELECT timestamp(string=Timestamp) AS Time, Sequence,
           atoi(string=Process.PID) AS Pid,
           atoi(string=Process.PPID) AS Ppid,
           Process.PPID AS PPID,
           atoi(string=Summary.Actor.Primary) AS UserId,
           Process.Title AS CmdLine,
           Process.Exe AS Exe,
           Process.CWD AS CWD
       FROM audit()
       WHERE &quot;procmon&quot; in Tags AND Result = &#x27;success&#x27;

     // Cache Uid -&gt; Username mapping.
     LET users &lt;= SELECT User, atoi(string=Uid) AS Uid
       FROM Artifact.Linux.Sys.Users()

     // Enrich the original artifact with more data.
     SELECT Time, Pid, Ppid, UserId,
              { SELECT User from users WHERE Uid = UserId} AS User,
              regex_replace(source=read_file(filename= &quot;/proc/&quot; + PPID + &quot;/cmdline&quot;),
                            replace=&quot; &quot;, re=&quot;[\\0]&quot;) AS Parent,
              CmdLine,
              Exe, CWD
       FROM exec_log

</code></pre>

