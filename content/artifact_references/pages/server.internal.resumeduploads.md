---
title: Server.Internal.ResumedUploads
description: "Displays the status and details of all resumable upload operations\non the server.\n"
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
build:
  list: never
---

Displays the status and details of all resumable upload operations
on the server.


---

````yaml
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
````


