---
menutitle: "Resource Limits"
title: "Limiting resource usage"
date: 2025-05-13
draft: false
weight: 130
summary: "How to limit an artifact's resource usage"
last_reviewed: 2025-05-18
---

Velociraptor often runs on performance sensitive endpoints, like
servers and laptops, as well as low resource machines like cloud
virtual machines. It is critical to ensure that Velociraptor does not
generate undue load on the endpoint, leading to performance
degradation.

Resource limits can be placed on queries and collections. These limits
are usually set in the artifact collection or hunt creation workflows
in the GUI.  However it is possible to predefine these limits in the
artifact definitions themselves using the `resources` key. If resource
limits are specified in the artifact then the user still has the
opportunity to change these as usual in the GUI workflows.

Resource limits are essential for controlling the load on endpoints
and preventing collections from negatively impacting users or network
infrastructure. They protect the endpoint.

They act as a "fail safe" mechanism to prevent accidents, such as
inadvertently collecting massive quantities of data or using excessive
resources.

Setting resource limits can ensure that runaway queries or collections
that take too long are cancelled before they cause too many problems.

Resource control is specific to an artifact and what it does. For
example, CPU limiting is useful for artifacts doing heavy processing
like Yara scans but not necessarily for others.

Limits are set using the `resources` key in the artifact definition.

resources:
* `timeout`
* `ops_per_second`
* `cpu_limit`
* `iops_limit`
* `max_rows`
* `max_upload_bytes`
* `max_batch_wait`
* `max_batch_rows`
* `max_batch_rows_buffer`

If you define `resources` in your artifact, you only need to specify
the subkeys relevant to the resources you want to limit. Default
values will apply to any subkeys not specified, and as mentioned
above, users still have the opportunity to override these limits in
the GUI before collecting the artifact.

**Example:**

```yaml
resources:
  timeout: 1800
  cpu_limit: 50
```

## Time Limits

There are two timeouts. The first is for the overall collection and
for offline collections there is no timeout by default. There is also
a progress timeout which aims to catch cases where a query is not
making progress in a reasonable time.

`Timeout / Max Execution Time`: This sets a maximum duration for an
artifact collection. The default timeout is 600 seconds. If the
timeout is reached, the collection is timed out and cancelled.

<!--
We extract the default resource limits from each artifact definition
and calculate a collection wide default. For example if a collection
specifies artifact A (with max_rows = 10) and artifact B (with
max_rows = 20), then the collection will have max_rows = 20.
-->

  - `timeout` (Query Timeout): A general timeout parameter can be set
    for a query. This timeout applies to the entire query and cancels
    the collection when exceeded. Timed-out flows might need to be
    re-run with increased timeouts Setting a timeout is considered a
    way to make a query safe enough.  Queries are typically limited to
    10 minutes (600 seconds).

  - `progress_timeout` (Max Idle Time in Seconds): This parameter, set
    in the resources section, terminates a query if no progress (rows
    emitted) is detected within the specified time. By default, it is
    not set (which means there is no limit). In the context of offline
    collectors, this kills the specific artifact that is not making
    progress, allowing the collection to move on. This parameter can
    also be provided to the `query()` plugin for more fine-grained
    control. This limit cannot currently be specified in an artifact's
    `resources` section.

  - Notebook Query Timeout: The timeout for notebook queries is
    hardcoded to 10 minutes.


## Resource Limits

Resource limits can be applied to any artifacts/collections, although
the effectiveness of these limits depends on what the artifact
actually does. In particular CPU and IO limits are not enforceable
when running external applications via execve().

- **CPU Limit**: This limits how much CPU the Velociraptor agent can
  use on average.  Setting a CPU limit pauses the query when the
  average CPU usage exceeds the limit, and it resumes when the average
  drops below the threshold.

  CPU limiting works in all queries, but the underlying plugin needs
  to support pausing.

  CPU limiting can cause queries to take longer or even not complete
  if the limit is set too low, since a limited query will stop until
  the CPU load for the entire process drops below the threshold, other
  queries which are not limited may preempt it.

  Setting a global CPU limit is generally not recommended; Only
  artifacts which are known to impose a high CPU load should have
  throttling enabled.

- **IOPS Limit**: The iops_limit parameter limits the I/O per
  second. The mechanism works by throttling the client based on an IO
  budget, not necessarily tied to real CPU load or bandwidth, and is
  most useful for large Yara scans. It can also be set on the
  `query()` plugin.

CPU and IOPS limits do not apply to external tools invoked by an
artifact since Velociraptor has no control over the resources they
consume.

## Data Limits

- **Max Rows**: This limit restricts the number of rows returned by a
  collection.  This limit is set per collection and works by
  cancelling the entire collection once the limit is reached. Server
  artifacts currently don't enforce a row limit.

- **Max Upload Bytes**: This limits the total amount of data
  transferred back from the client as an "Upload" (i.e. bulk
  files). This limit is set per collection and cancels the entire
  collection when reached. This is a crucial limit to prevent
  accidentally collecting massive amounts of data.

## Limiting Memory Use

It is not possible to limit memory usage via artifacts. However there
is a [setting]({{< ref
"/docs/deployment/references/#Client.max_memory_hard_limit" >}}) that
implements a hard limit for clients. If the memory usage exceeds the
limit the client will hard exit. If it is installed as a Windows
service then the service recovery option should restart the client
automatically.

The server monitors memory usage and will cancel a query if it reaches
a high limit. Memory is controlled via a nanny for the entire process,
with hard and soft limits. If memory is exceeded, it kills the query.
