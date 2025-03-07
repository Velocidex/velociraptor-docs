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
    SELECT * FROM if(condition=AlsoUpload,
    then={
       SELECT OSPath, upload(file=OSPath) AS Upload
       FROM glob(globs=JournalGlob)
    })

- query: |
    SELECT * FROM foreach(row={
      SELECT OSPath FROM glob(globs=JournalGlob)
    }, query={
      SELECT *
      FROM parse_journald(filename=OSPath,
          start_time=DateAfter, end_time=DateBefore)
    })

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

