---
title: watch_evtx
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_evtx
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of event log files to parse.|list of string (required)
accessor|The accessor to use.|string
messagedb|A Message database from https://github.com/Velocidex/evtx-data.|string

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


