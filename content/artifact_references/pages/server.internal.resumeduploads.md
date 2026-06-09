---
title: Server.Internal.ResumedUploads
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
description: |
  Displays the status and details of all resumable upload operations
  on the server.
---

Displays the status and details of all resumable upload operations
on the server.


<pre><code class="language-yaml">
name: Server.Internal.ResumedUploads
description: |
  Displays the status and details of all resumable upload operations
  on the server.

column_types:
- name: mtime
  type: timestamp
- name: atime
  type: timestamp
- name: ctime
  type: timestamp
- name: btime
  type: timestamp
- name: expected_size
  type: mb
- name: response
  type: hidden

</code></pre>

