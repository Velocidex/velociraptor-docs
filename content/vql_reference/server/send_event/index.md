---
title: send_event
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Sends an event to a server event monitoring queue.

  This is used to send an event to a waiting server event monitoring
  artifact (either as a VQL query running on the server or perhaps
  an external program waiting for this event via the API.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|The artifact name to send the event to.|string (required)
client_id|The client_id for this event in case of a client_event artifact.|string
row|The row to send to the artifact|ordereddict.Dict (required)

**Required permissions:** `SERVER_ADMIN`, `PUBLISH`

### Description

Sends an event to a server event monitoring queue.

This is used to send an event to a waiting server event monitoring
artifact (either as a VQL query running on the server or perhaps
an external program waiting for this event via the API.


