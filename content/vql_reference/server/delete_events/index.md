---
title: delete_events
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Delete events from a flow.
build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|Name of artifact events to remove|string (required)
client_id|Client ID of events to remove (use 'server' for server events)|string (required)
start_time|Start time to be deleted|time.Time
end_time|End time to be deleted|time.Time
really_do_it|If not specified, just show what files will be removed|bool

**Required permissions:** `DELETE_RESULTS`

### Description

Delete events from a flow.

