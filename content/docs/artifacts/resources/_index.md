---
menutitle: "Resource Limits"
title: "Limiting resource usage"
date: 2025-05-13
draft: false
weight: 120
summary: "How to limit an artifact's resource usage"
last_reviewed: 2025-05-18
---

Resource limits can be placed on queries and collections. These limits are
usually set in the artifact collection or hunt creation workflows in the GUI.
However it is possible to predefine these limits in the artifacts themselves. If
resource limits are specified in the artifact then the user still has the
opportunity to change these as usual in the GUI workflows.

Limits are set using the `resources` key in the artifact definition.

    "resources": {
      "timeout": 0,
      "ops_per_second": 0,
      "cpu_limit": 0,
      "iops_limit": 0,
      "max_rows": 0,
      "max_upload_bytes": 0,
      "max_batch_wait": 0,
      "max_batch_rows": 0,
      "max_batch_rows_buffer": 0

// We extract the default resource limits from each artifact
// definition and calculate a collection wide default. For
// example if a collection specifies artifact A (with max_rows
// = 10) and artifact B (with max_rows = 20), then the
// collection will have max_rows = 20.

If you define `resources` in your artifact, you only need to specify the subkeys
relevant to the resources you want to limit. Default values will apply to any
subkeys not specified, and as mentioned above users still have the opportunity
to overide these limits in the GUI before collecting the artifact.

**Example:**

```yaml
resources:
  timeout: 1800
  cpu_limit: 50
```

## Time Limits

  - Query Timeout: A general timeout parameter can be set for a query. This
    timeout applies to the entire query and cancels the collection when
    exceeded. Timed-out flows might need to be re-run with increased timeouts
    Setting a timeout is considered a way to make a query safe enough.

  - Default Query Timeout: Queries are typically limited to 10 minutes. The
    default query timeout is often 10 minutes (600 seconds)

  - `progress_timeout` (Max Idle Time in Seconds): This parameter, set in the
    resources section, terminates a query if no progress (rows emitted) is
    detected within the specified time. By default, it is not set. In the
    context of offline collectors, this kills the specific artifact that is not
    making progress, allowing the collection to move on. This parameter can also
    be provided to the `query()` plugin for more fine-grained control.

  - Notebook Query Timeout: The timeout for notebook queries is hardcoded to 10
    minutes.

  - Artifact Default Timeout: Artifacts can have default timeout values,
    typically 600 seconds (10 minutes).

## Resource Limits

- CPU Limit: The cpu_limit parameter works by pausing the query when the CPU
  utilization is higher than the set limit. It acts as a threshold, not a
  percentage of total CPU usage. If the limit is set too low, the query might
  never run. Velociraptor does not use a kernel mechanism (like nice in Linux)
  for this; it only stops and starts the query process. It cannot assign CPU
  load to a specific query, only looking at the total CPU usage. CPU limiting
  might cause events to be dropped in client monitoring artifacts. It's
  generally not useful for event queries because they are waiting on events. The
  `query()` plugin can be used to set CPU limits on specific sub-queries. The
  plugin being used needs to support pausing for the CPU limit to work
  effectively.

- IOPS Limit: The iops_limit parameter limits the I/O per second. It can also be
  set on the `query()` plugin.

## Limiting Memory Use

It is not possible to limit memory usage via artifacts. However there is a
[setting]({{< ref "/docs/deployment/references/#Client.max_memory_hard_limit" >}})

that implements a hard limit for clients. If the memory usage exceeds the limit
the client will hard exit. If it is installed as a Windows service then the
service recovery option should restart the client automatically.