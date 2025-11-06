---
title: "Running Offline Collectors"
menutitle: "Running"
date: 2025-11-03
last_reviewed: 2025-11-03
draft: false
weight: 20
---

## Terminal behaviour

### Windows

### Linux




### Collecting across the network

By having a single executable collector, all we need is to run it
remotely. We can use another EDR solution that allows remote execution
if available. Alternatively, we can use Window's own remote management
mechanisms (such as PsExec or WinRM) to deploy our binary across the
network.  Simply, copy our collector binary across the network to C$
share on the remote system and use, e.g. `wmic` to launch our binary
on the remote host.

![Collecting across the network](image45.png)

## Debugging

For debugging more advanced issues, the offline collector also provides the same
Debug Console that is available on the server and clients.

To learn how to enable and access it please see
[Debugging the offline collector]({{< ref "/docs/troubleshooting/debugging/#debugging-the-offline-collector" >}}).
