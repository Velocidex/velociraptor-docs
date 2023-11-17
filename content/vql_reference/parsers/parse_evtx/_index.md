---
title: parse_evtx
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_evtx
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of event log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
messagedb|A Message database from https://github.com/Velocidex/evtx-data.|string
workers|If specified we use this many workers to parse the file in parallel (default 1).|int64

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Parses events from an EVTX file.

This plugin parses windows events from the Windows Event log files (EVTX).

A windows event typically contains two columns. The `EventData`
contains event specific structured data while the `System` column
contains common data for all events - including the Event ID.

You should probably almost always filter by one or more event ids
(using the `System.EventID.Value` field).

### Example

```vql
SELECT System.TimeCreated.SystemTime as Timestamp,
       System.EventID.Value as EventID,
       EventData.ImagePath as ImagePath,
       EventData.ServiceName as ServiceName,
       EventData.ServiceType as Type,
       System.Security.UserID as UserSID,
       EventData as _EventData,
       System as _System
FROM watch_evtx(filename=systemLogFile) WHERE EventID = 7045
```


