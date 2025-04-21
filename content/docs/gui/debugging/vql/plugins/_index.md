---
title: "Plugins"
description:  See currently running VQL plugins
weight: 20
---

At their core VQL queries process rows emitted from VQL plugins. We
have seen previously the Active Queries tracker which provides
information on currently running queries.

However it is also useful to know what plugins are currently running
and what parameters are used within them. This gives us a really good
idea what the VQL engine is doing exactly at the moment.

![Plugin tracker profile](profile.png)

The above example show the plugins currently active. We see a few
instances of `watch_monitoring()`. Another instance of `watch_etw()`
plugin is seen watching the Sysmon ETW stream. Finally we see some
instances of `watch_evtx()` watching various event logs.

Note that while the query view shows what queries are running, this
view shows the specific plugins running with the values provided to
them. The query view usually shows variable names being passed to the
plugins, but this view shows the content of the variables.

Sometimes a query runs very slowly and we dont really know why. Using
the plugins profile helps us understand what operations are currently
running. For example, a common reason for slow down is when an
artifact accesses files on a network share or fuse share because those
types of access involve network transfers which may be very slow.
