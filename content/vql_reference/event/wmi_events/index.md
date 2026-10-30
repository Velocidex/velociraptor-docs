---
title: wmi_events
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Executes an evented WMI queries asynchronously.

  This plugin sets up a [WMI event](https://docs.microsoft.com/en-us/windows/desktop/wmisdk/receiving-a-wmi-event) listener query.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
query|WMI query to run.|string (required)
namespace|WMI namespace|string (required)
wait|Wait this many seconds for events and then quit.|int64 (required)

**Required permissions:** `MACHINE_STATE`

### Description

Executes an evented WMI queries asynchronously.

This plugin sets up a [WMI event](https://docs.microsoft.com/en-us/windows/desktop/wmisdk/receiving-a-wmi-event) listener query.


