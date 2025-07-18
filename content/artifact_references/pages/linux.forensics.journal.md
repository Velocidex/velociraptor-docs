---
title: Linux.Forensics.Journal
hidden: true
tags: [Client Artifact]
---

Parses the binary journal logs. Systemd uses a binary log format to
store logs.


<pre><code class="language-yaml">
name: Linux.Forensics.Journal
description: |
  Parses the binary journal logs. Systemd uses a binary log format to
  store logs.

parameters:
- name: JournalGlob
  type: glob
  description: A Glob expression for finding journal files.
  default: /{run,var}/log/journal/*/*.journal
- name: IdentifierRegex
  type: regex
  description: "Regex of event source e.g sshd or kernel"
- name: IocRegex
  type: regex
  description: "IOC Regex in event data"
- name: DateAfter
  type: timestamp
  description: "search for events after this date. YYYY-MM-DDTmm:hh:ssZ"
- name: DateBefore
  type: timestamp
  description: "search for events before this date. YYYY-MM-DDTmm:hh:ssZ"
- name: AlsoUpload
  type: bool
  description: If set we also upload the raw files.

sources:
- name: Uploads
  query: |
     SELECT *
     FROM if(condition=AlsoUpload,
             then={
         SELECT OSPath,
                upload(file=OSPath) AS Upload
         FROM glob(globs=JournalGlob)
       })


- query: |
     LET standard = SELECT *
       FROM foreach(row={
         SELECT OSPath
         FROM glob(globs=JournalGlob)
       },
                    query={
         SELECT *
         FROM parse_journald(filename=OSPath,
                             start_time=DateAfter,
                             end_time=DateBefore)
       })
     
     LET identifier_only = SELECT *
       FROM foreach(row={
         SELECT OSPath
         FROM glob(globs=JournalGlob)
       },
                    query={
         SELECT *
         FROM parse_journald(filename=OSPath,
                             start_time=DateAfter,
                             end_time=DateBefore)
         WHERE EventData.SYSLOG_IDENTIFIER =~ IdentifierRegex
       })
     
     LET all_regex = SELECT *
       FROM foreach(row={
         SELECT OSPath
         FROM glob(globs=JournalGlob)
       },
                    query={
         SELECT *
         FROM parse_journald(filename=OSPath,
                             start_time=DateAfter,
                             end_time=DateBefore)
         WHERE EventData.SYSLOG_IDENTIFIER =~ IdentifierRegex
          AND format(format='%s_%s_%s',
                     args=[EventData, System._CMDLINE, System._EXE]) =~
                IocRegex
       })
     
     LET ioc_only = SELECT *
       FROM foreach(row={
         SELECT OSPath
         FROM glob(globs=JournalGlob)
       },
                    query={
         SELECT *
         FROM parse_journald(filename=OSPath,
                             start_time=DateAfter,
                             end_time=DateBefore)
         WHERE format(format='%s_%s_%s',
                      args=[EventData, System._CMDLINE,
                        System._EXE]) =~ IocRegex
       })
     
     SELECT *
     FROM if(condition=IdentifierRegex
              AND IocRegex,
             then=all_regex,
             else=if(condition=IdentifierRegex,
                     then=identifier_only,
                     else=if(condition=IocRegex, then=ioc_only, else=standard)))

  notebook:
    - type: vql_suggestion
      name: Simplified syslog-like view
      template: |
        /*
        # Simplified log view
        */
        LET ColumnTypes&lt;=dict(`_ClientId`='client')

        SELECT System.Timestamp AS Timestamp,
               ClientId AS _ClientId,
               client_info(client_id=ClientId).os_info.hostname AS Hostname,
               EventData.SYSLOG_IDENTIFIER AS Unit,
               EventData.MESSAGE AS Message
        FROM source()

</code></pre>

