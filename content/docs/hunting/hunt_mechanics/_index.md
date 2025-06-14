---
menutitle: "Hunt Mechanics"
title: "Client Hunt Mechanics"
date: 2025-05-15
draft: true
weight: 10
summary: |
  The mechanics of how Velociraptor clients are notified about and pick up hunts
  involve the client-server communication model, the Hunt Manager's scheduling,
  and a notification process.
last_reviewed: 2025-05-15
---

The mechanics of how Velociraptor clients are notified about and pick up hunts
involve the client-server communication model, the Hunt Manager's scheduling,
and a notification process.

## Client-Server Communication

Velociraptor clients connect to the server over HTTP, typically within a TLS
connection, using a persistent communication channel. This channel allows for
quick tasking of endpoints without waiting for typical polling intervals.

Despite the persistent channel, clients do poll to retry connection or check for
new work, by default every 600 seconds (poll_max).

## Hunt Manager and Scheduling

The Hunt Manager component is responsible for scheduling collections (which are
part of a hunt) on clients.

When a client checks in, the Hunt Manager determines if that client should
participate in a hunt based on conditions like labels or OS matches.

The Hunt Manager maintains an index of clients to keep track of which ones have
been issued a hunt for. This index helps prevent the same collection (flow) from
being scheduled multiple times for a client, which could happen due to race
conditions with queued messages.

The scheduling step is distinct from adding the collection to the hunt. The
server schedules a collection for a client, and when the client connects or
checks in, it will perform the collection. The client may be offline and not
perform the task immediately.

## Client Notification

When a new hunt is started or new work is available, the server notifies
clients.

This notification rate can be controlled by the notifications_per_second
configuration parameter. Throttling this rate helps reduce the load on the
server and mitigates the "swarm effect" where many clients try to connect
simultaneously.

Specifically, the notification service now batches notifications, and currently
connected clients are specifically forwarded to the hunt manager instead of
notifying all clients, which keeps them connected and avoids a "thundering herd"
condition.

## Client States and Hunt Execution

When a collection is initially scheduled by the hunt manager, the client is in
the Scheduled state.

When the client checks in and receives the request, the collection moves to the
In Progress state.

If the server loses contact, the state might become Unresponsive.

If the client comes back online and the collection cannot be resumed or is
unknown, it might go into an Error state.

Velociraptor is designed for "instant collection" because of this persistent
channel and notification mechanism.

Hunts are generally designed to run once. If a hunt is stopped, new clients will
not be scheduled for it; if it's started again, new clients checking in will be
scheduled.

## Controlling Hunt Assignment

Hunts can be specified to run on clients with a particular label. You can add
labels manually or using a VQL function like label(). Clients can be added to a
hunt by adding them to a label group after the hunt is started.

Clients can also be manually added to a hunt using the hunt_add() VQL function,
which schedules the client immediately regardless of labels or if the hunt is
paused or expired. The ability for `hunt_add()` to work on active hunts was
implemented in version 0.6.0.

Scheduled hunts can be configured using server monitoring artifacts like
`Server.Monitoring.ScheduleHunt`. It is important for such recurring hunts to
expire in time for the next iteration to avoid a large number of hunts being
scheduled on a single client. In essence, the server's Hunt Manager schedules
tasks for clients, and clients checking in or receiving notifications on their
persistent channel pick up these tasks to execute the hunt artifacts.