---
title: Logging and Monitoring
menutitle: Logging
date: 2025-02-20
draft: false
weight: 80
summary: |
  * Velociraptor can log important information to disk or syslog, and provides
  a monitoring endpoint to allow monitoring by external applications.
---

## Logging

Velociraptor can write server event logs to disk and optionally also forward
these to a remote syslog server.

Logging is configured via the server configuration file's
[Logging]({{% ref "/docs/deployment/references/#Logging" %}})
section.

## Collecting performance metrics

When Velociraptor is run in production it is often necessary to build
dashboards to monitor the server's characteristics, such as memory
user, requests per second etc.

Velociraptor exports a lot of important metrics using the standard
`Prometheus` library. This information may be scraped from the
server's monitoring port (by default
http://127.0.0.1:8003/metrics). You can change the port and bind
address for the metrics server using the [Monitoring.bind_port
]({{% ref "/docs/deployment/references/#Monitoring.bind_port" %}}) and [Monitoring.bind_address
]({{% ref "/docs/deployment/references/#Monitoring.bind_address" %}}) setting.

You can either manually see program metrics using curl or configure an
external system like [Grafana](https://grafana.com/) or
[DataDog](https://www.datadoghq.com/) to scrape these metrics.

```
curl http://127.0.0.1:8003/metrics | less
```

For more information about setting up Prometheus and Graphana, please see the
[Deployment > Server Performance and Monitoring]({{< ref "/docs/deployment/resources/" >}})
page.

We recommend that proper monitoring be implemented in production systems.
