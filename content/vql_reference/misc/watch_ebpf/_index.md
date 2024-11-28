---
title: watch_ebpf
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_ebpf
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
events|A list of event names to acquire.|list of string (required)
include_env|Include process environment variables.|bool

Required Permissions: 
<span class="linkcolour label label-success">MACHINE_STATE</span>

### Description

Watch for events from eBPF.

This plugin uses the integrated tracee eBPF engine to stream events.

See https://github.com/Velocidex/tracee_velociraptor for more details.

### See also

- [ebpf_events](/vql_reference/misc/ebpf_events/): Dumps information about
  potential ebpf_events.


