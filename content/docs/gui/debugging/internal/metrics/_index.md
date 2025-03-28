---
title: "Metrics"
weight: 10
---

Metrics are counters in the program that are used to collect high
level statistics about program execution.

Metrics are also exported on the server using the `Metrics
Server`. This is controlled in the configuration file [Monitoring]({{< ref "/docs/deployment/references/#Monitoring" >}})
section:

```yaml
Monitoring:
 bind_address: 127.0.0.1
 bind_port: 8003
 metrics_url: http://localhost:8003/metrics
```

On the server, you can collect monitoring data using curl:

```
curl http://localhost:8003/metrics
```

Monitoring data is not exposed by the client.

The data is provided in a standard way to interface to various
scrapers, such as
[Prometheus](https://github.com/prometheus/prometheus),
[Grafana](https://grafana.com/) or
[Datadog](https://www.datadoghq.com/). We encourage deployments to use
this data to build health dashboards and service alerts. Although
inspecting this data manually can also provide valuable insight.

The below discusses some of the common metric types exported.

## Counters

A counter just counts the number of events that occurred for example
the `rsa_decrypt_op` counter counts how many times we needed to call
RSA decrypt operations.

```
# HELP rsa_decrypt_op Total number of rsa decryption ops.
# TYPE rsa_decrypt_op counter
rsa_decrypt_op 4
```

Since these operations are CPU intensive, we avoid making these as
much as possible by implementing a caching mechanism for session
keys - so we would expect the number to increase quickly after startup
but eventually level off during runtime.


## Gauges

A Gauge reflects the total number of things at this moment in time -
the number can go up or down as time goes on. For example the
`client_comms_current_connections` shows the current number of clients
connected

```
# HELP client_comms_current_connections Number of currently connected clients.
# TYPE client_comms_current_connections gauge
client_comms_current_connections 2
```

As client connect and disconnect this number will change. The GUI
dashboard shows a live graph of this metric.

## Histogram data

A Histogram is a set of counters which is split by time. This helps to
understand how many requests occur within a particular time bucket and
is used to measure latency (or how fast a service performs).

Velociraptor has a lot of histograms measuring latency of various
operations (mainly IO related operations).

For example the `datastore_latency_bucket` measure the latency of various data store operations:

```
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.01"} 4528
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.060000000000000005"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.11000000000000001"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.16000000000000003"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.21000000000000002"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.26"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.31"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.36"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.41"} 4554
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="0.45999999999999996"} 4555
datastore_latency_bucket{action="read",datastore="FileBaseDataStore",tag="FlowContext",le="+Inf"} 4556
```

The above example looks at `read` operations of the
`FileBaseDataStore`, when reading `FlowContext` data. We see that
there were 4556 operations in total (completed in the `+Inf`
bucket). However only 4528 operations completed within 0.01
seconds. If the underlying filesystem is slow (as for example in
running over NFS or a another network filesystem), many operations
will not complete quickly and so most operations will take longer to
complete (i.e. higher latency).
