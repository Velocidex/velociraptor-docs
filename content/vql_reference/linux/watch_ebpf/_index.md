---
title: watch_ebpf
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
---



<div class="vql_item"></div>


## watch_ebpf
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
events|A list of event names to acquire.|list of string
include_env|Include process environment variables.|bool
policy|Use a tracee policy in YAML format to specify events instead.|string
regex_prefilter|A regex that must match the raw buffer before we process it.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Watch for events from eBPF.

This plugin uses the integrated tracee eBPF engine to stream events.

See https://github.com/Velocidex/tracee_velociraptor for more details.

## Tracee policies.

As of release 0.76, when calling this plugin, callers can supply
a tracee policy instead of a list of events. The policy is a YAML
file in a format described
[here](https://aquasecurity.github.io/tracee/v0.14/docs/policies/)

Velociraptor supports a subset of Tracee policies. Currently:

* [Scope](https://aquasecurity.github.io/tracee/v0.14/docs/policies/scopes/): This allows targeting the policy at a particular process
* [Rules](https://aquasecurity.github.io/tracee/v0.14/docs/policies/rules/): This allows kernel side filtering of events - essential for reducing CPU load.

Tracee actions are not supported, as the events are simply passed
to the VQL query. If you want to handle the events simply handle
it in VQL.

For example:

```yaml
metadata:
   name: file-open-home
spec:
  scope:
    - global
  rules:
    - event: security_file_open
      filters:
        - args.pathname=/home/*
```

The above policy matches all processes (scope is global). The
policy adds one event to watch (`security_file_open` reports when
a file is opened). Normally there are many such events, so to save
on CPU load, the policy also filters the pathname to start with
`/home/`.

This will report all processes opening all files in the `/home/`
directory.

```vql
SELECT * FROM watch_ebpf(policy=Policy)
```

NOTES:

1. The policy name is optional, if you do not specify it, a random
   name is used. This is preferable to ensure that a second
   instance of the query can register the same policy again.

2. There is a limit of 64 policies leading to a limit of 64
   concurrent `watch_ebpf()` queries.

### See also

- [ebpf_events]({{< ref "/vql_reference/linux/ebpf_events/" >}}): Dumps information about
  potential ebpf_events.


