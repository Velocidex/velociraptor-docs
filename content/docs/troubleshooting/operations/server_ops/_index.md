---
title: Troubleshooting Server Operational Issues
menutitle: Server Ops
date: 2025-02-20
draft: false
weight: 20
summary: |
  * Troubleshooting issues occurring on an operational server.
---

{{% notice note %}}

The steps in this section assume your server has previously been operating
correctly and is now encountering an unexpected issue.

If you are having problems during server deployment then please see the section
[Server Deployment Issues]({{< ref "/docs/troubleshooting/deployment/server/" >}})
within the Deployment Troubleshooting section.

{{% /notice %}}

### Server crashes

Although we do our best to prevent it, it's always a possibility that bugs or
unusual VQL operations can cause the server to crash. Velociraptor has the
ability to record the stacktrace to a log file if such conditions occur.
This feature is enabled by default for the server.

Crashes should result in a "panic log" file being written to the `logs`
directory in the server datastore. This log file will include the time and date
in the file name, for example `panic-2025-09-27T20_53_06+02_00.log`.

Please submit this file, along with any additional information about what user
actions might have caused the crash, to our developer team by
[opening a new issue on GitHub](https://github.com/Velocidex/velociraptor/issues/).

### Performance issues

If you are experiencing poor server performance, we recommend that you review
the
[Deployment > Server Performance and Monitoring]({{< ref "/docs/deployment/resources/" >}})
page to better understand potential causes of performance issues in general.

If your deployment has grown significantly in size since the initial deployment
then it may simply be a case of inadequate server resources. You could consider
scaling up your server resources or for very large deployments you may decide to
scale your system horizontally by turning it into a
[multi-frontend deployment]({{< ref "/docs/deployment/server/multifrontend/" >}}).

#### Observing basic performance metrics

Basic CPU and memory metrics for the server are displayed on the Dashboard page
in the GUI.

![Basic performance metrics](dashboard_performance.png)

#### Collecting profile data

If you encounter issues when collecting artifacts on the server (perhaps via the
API), you can use the `Server.Monitor.Profile` artifact to collect profile data.
This is similar to the process described in the section about
[debugging a remote client]({{< ref "/docs/troubleshooting/operations/remote_clients/#debugging-a-remote-client" >}}).

![Server.Monitor.Profile results](server_monitor_profile_results.png)

![Server.Monitor.Profile file uploads](server_monitor_profile_uploads.png)

![Exporting Server.Monitor.Profile data](server_monitor_profile_export.png)

You can share the result of the collection by exporting and sharing it with the
development team via Discord or GitHub issues.

#### Collecting performance metrics

Velociraptor exports many important metrics using the standard
[Prometheus](https://prometheus.io/) library.
This information may be scraped from the
server's monitoring endpoint, by default `http://127.0.0.1:8003/metrics`.

When Velociraptor is run in production it is often integrated with 3rd-party
performance monitoring apps to monitor the server's performance characteristics.
This monitoring data can be helpful for understanding how a problem may have
developed over time. We recommend that such monitoring be implemented for
production systems.

You can change the port and bind address for the metrics server using the
[Monitoring.bind_port ]({{< ref "/docs/deployment/references/#Monitoring.bind_port" >}}) and
[Monitoring.bind_address ]({{< ref "/docs/deployment/references/#Monitoring.bind_address" >}})
settings.

You can either manually see program metrics using curl or configure an external
system like [Grafana](https://grafana.com/) or
[DataDog](https://www.datadoghq.com/) to periodically scrape these metrics.

```sh
curl http://127.0.0.1:8003/metrics | less
```

For more information about setting up Prometheus and Graphana, please see the
[Deployment > Server Performance and Monitoring]({{< ref "/docs/deployment/resources/" >}})
page.


### Troubleshooting other operational issues

#### Logging

Velociraptor can write server event logs to disk and optionally also forward
these to a remote syslog server. We recommend that you enable logging on
production systems, ideally to a secure remote server, and that you also
implement systems that allow for monitoring these logs and for searching them
should the need arise.

Logging is configured via the server configuration file's
[Logging]({{% ref "/docs/deployment/references/#Logging" %}})
section.

#### Debugging

For more complicated issues Velociraptor provides extensive debugging
capabilities for individual operational aspects. For more information about
debugging, please see the [Debugging]({{< ref "/docs/troubleshooting/debugging/" >}})
section.