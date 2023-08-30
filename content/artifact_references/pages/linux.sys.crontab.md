---
title: Linux.Sys.Crontab
hidden: true
tags: [Client Artifact]
---

Displays parsed information from crontab.


<pre><code class="language-yaml">
name: Linux.Sys.Crontab
description: |
  Displays parsed information from crontab.
parameters:
  - name: cronTabGlob
    default: /etc/crontab,/etc/cron.d/**,/var/at/tabs/**,/var/spool/cron/**,/var/spool/cron/crontabs/**
  - name: cronTabScripts
    default: /etc/cron.daily/*,/etc/cron.hourly/*,/etc/cron.monthly/*,/etc/cron.weekly/*
  - name: Length
    default: 10000
    type: int

precondition: SELECT OS From info() where OS = &#x27;linux&#x27;

sources:
  - name: CronTabs
    query: |
      LET raw = SELECT * FROM foreach(
          row={
            SELECT OSPath from glob(globs=split(string=cronTabGlob, sep=&quot;,&quot;))
          },
          query={
            SELECT OSPath, data, parse_string_with_regex(
              string=data,
              regex=[
                 /* Regex for event (Starts with @) */
                 &quot;^(?P&lt;Event&gt;@[a-zA-Z]+)\\s+(?P&lt;Command&gt;.+)&quot;,

                 /* Regex for regular command. */
                 &quot;^(?P&lt;Minute&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;Hour&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;DayOfMonth&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;Month&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;DayOfWeek&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;User&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;Command&gt;.+)$&quot;]) as Record

            /* Read lines from the file and filter ones that start with &quot;#&quot; */
            FROM split_records(
               filenames=OSPath,
               regex=&quot;\n&quot;, columns=[&quot;data&quot;]) WHERE not data =~ &quot;^\\s*#&quot;
            }) WHERE Record.Command

      SELECT Record.Event AS Event,
               Record.User AS User,
               Record.Minute AS Minute,
               Record.Hour AS Hour,
               Record.DayOfMonth AS DayOfMonth,
               Record.Month AS Month,
               Record.DayOfWeek AS DayOfWeek,
               Record.Command AS Command,
               OSPath AS Path
      FROM raw
  - name: CronScripts
    query: |
      SELECT Mtime, OSPath, read_file(filename=OSPath,length=Length) AS Content
      FROM glob(globs=split(string=cronTabScripts, sep=&quot;,&quot;))
  - name: Uploaded
    query: |
      SELECT OSPath, upload(file=OSPath) AS Upload
      FROM glob(globs=split(string=cronTabGlob + &quot;,&quot; + cronTabScripts, sep=&quot;,&quot;))

</code></pre>

