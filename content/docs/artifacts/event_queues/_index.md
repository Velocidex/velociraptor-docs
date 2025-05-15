---
menutitle: "Event Queues"
title: "Event Queues"
date: 2025-01-25
draft: false
weight: 120
summary: "Artifacts that create event queues"
last_reviewed: 2025-04-30
---

This section will cover server event queues.

type SERVER_EVENT or CLIENT_EVENT (or INTERNAL)

These don't need to be run but can also include VQL queries

`send_event()`

`watch_monitoring()`

```yaml
name: Custom.Server.Internal.Alerts
description: |
  An internal event queue for alerts. All alerts sent from clients are
  collected in this event queue.

  Alerts are expected to be low frequency and high value and may be
  generated client or server side.

type: SERVER_EVENT
```

so this is how event queries work
the artifact defines the name of the channel over which the events are sent
events can be sent on the channel by anyone at any time
things can listen to events by using the channel name (which is the artifact name)
these things have nothing to do with the event table or the GUI
in the GUI you can set an event query to run which will feed events to the channel
so that gui will start the query that feed events to the channel but events can go to the channel regardless
the gui will show the content of the events that are written on the channel (basically artifact name)
this happens if there are any events there - regardless of if the artifact is
enabled or not

Available event queues:

- `Server.Internal.Alerts`
- `Server.Internal.ArtifactModification`
- `Server.Audit.Logs`
- `Server.Internal.ClientConflict`
- `Server.Internal.ClientDelete`
- `Server.Internal.ClientInfo`: related to the `client_info_update_time` config setting
- `Server.Internal.ClientInfoSnapshot`
- `Server.Internal.ClientPing`
- `Server.Internal.ClientScheduled`
- `Server.Internal.ClientTasks`
- `Server.Internal.Enrollment`
- `Server.Internal.FrontendMetrics`
- `Server.Internal.HuntModification`
- `Server.Internal.HuntUpdate`
- `Server.Internal.Interrogation`
- `Server.Internal.Inventory`
- `Server.Internal.Label`
- `Server.Internal.MasterRegistrations`
- `Server.Internal.MetadataModifications`
- `Server.Internal.Notifications`
- `Server.Internal.Ping`
- `Server.Internal.Pong`
- `Server.Internal.UserManager`