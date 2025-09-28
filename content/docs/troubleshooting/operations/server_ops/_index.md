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

### Server crashes during operations

It's possible that bugs or unusual VQL operations can cause the server to crash.
Velociraptor has the ability to record the stacktrace to a log file if such
conditions occur, and this feature is enabled by default for the server.

Crashes should result in a "panic log" file being written to the `logs`
directory in the server datastore. This log file will include the time and date
in the file name, for example `panic-2025-09-27T20_53_06+02_00.log`.

Please submit this file, plus additional information about what user actions
might have caused the crash, to our developer team by
[opening a new issue on GitHub](https://github.com/Velocidex/velociraptor/issues/).
