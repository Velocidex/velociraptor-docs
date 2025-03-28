---
title: "Evtx"
weight: 40
---

The Windows Event Logs contain windows event from various
sources. Velociraptor contains a parser to dump out all events from a
Windows event log, but the `watch_evtx()` plugin can be used to follow
the log file as events are written to it.

This allows Velociraptor to analyze events in real time, as they are
flushed into the log file. For example, the
`Windows.Hayabusa.Monitoring` artifact uses this functionality to
apply sigma rules in real time to detect events as soon as possible.

How does Velociraptor follow the event log? The algorithm requires
Velociraptor to periodically check the last message in the file, then
parse the message between the last parsed message until the latest.

![Windows Event Log profile](profile.png)

This process is illustrated by inspecting the `Windows Event Log
Tracker`. The example above shows that Velociraptor is currently
watching 32 different event log files.

Each file is scanned periodically (by default every 60 seconds). We
can see the last scan time of the file, and when we plan to scan the
file again. Important to note that the scan time is somewhat
randomized to avoid Velociraptor processing all files at the same time
(This is called the [Thundering Herd Problem](https://en.wikipedia.org/wiki/Thundering_herd_problem#) ).

The two major operations are `Find Last Event` which scans the event
log file to find the last event, and `Monitor Once` which parses all
the events since the last checkpoint and emits those into the output
of the plugin (Note that this time may be increased due to delays
introduced by the plugin consumer).
