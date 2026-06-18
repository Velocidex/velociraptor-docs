---
title: Linux.Events.Journal
hidden: true
sitemap:
  disable: true
tags: [Client Event Artifact]
description: |
  Forwards events from the Systemd binary journal logs.
---

Forwards events from the Systemd binary journal logs.


<pre><code class="language-yaml">
name: Linux.Events.Journal
description: |
  Forwards events from the Systemd binary journal logs.

type: CLIENT_EVENT

parameters:
- name: JournalGlob
  type: glob
  description: A Glob expression for finding journal files.
  default: /{run,var}/log/journal/*/*.journal

sources:
- query: |
    SELECT * FROM foreach(row={
      SELECT OSPath FROM glob(globs=JournalGlob)
    }, query={
      SELECT *
      FROM watch_journald(filename=OSPath)
    }, workers=100)

</code></pre>

