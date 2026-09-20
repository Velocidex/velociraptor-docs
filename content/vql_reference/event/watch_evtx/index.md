---
title: watch_evtx
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Watch an EVTX file and stream events from it.

  This is the Event plugin version of `parse_evtx()`.

  {{% notice note %}}

  It often takes several seconds for events to be flushed to the event
  log and so this plugin's event may be delayed. For some applications
  this results in a race condition with the event itself - for example,
  files mentioned in the event may already be removed by the time the
  event is triggered.

  {{% /notice %}}

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|A list of event log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
messagedb|A Message database from https://github.com/Velocidex/evtx-data.|string
workers|If specified we use this many workers to parse the file in parallel (default 1).|int64

**Required permissions:** `FILESYSTEM_READ`

### Description

Watch an EVTX file and stream events from it.

This is the Event plugin version of `parse_evtx()`.

{{% notice note %}}

It often takes several seconds for events to be flushed to the event
log and so this plugin's event may be delayed. For some applications
this results in a race condition with the event itself - for example,
files mentioned in the event may already be removed by the time the
event is triggered.

{{% /notice %}}


