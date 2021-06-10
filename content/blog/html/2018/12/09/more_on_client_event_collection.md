---
date: 2018-12-09T04:10:06Z
description:  |
  Previously we have seen that Velociraptor can monitor client events
  using Event Artifacts. To recap, Event Artifacts are simply artifacts
  which contain event VQL queries. Velociraptor's VQL queries do not
  have to terminate by themselves - instead VQL queries may run
  indefinitely, trickling results over time.

  This post takes another look at event queries and demonstrates how
  these can be used to implement some interesting features.

title: More on client event collection
url: /blog/html/2018/12/09/more_on_client_event_collection.html
categories: ["Blog"]
hidden: true
---

Periodic Event queries
======================

The simplest kind of events are periodically generated events. These are
created using the clock() VQL plugin. This is a simple event plugin
which just emits a new row periodically.

``` {.sourceCode .bash}
$ velociraptor query "select Unix from clock(period=5)" --max_wait 1
[
 {
   "Unix": 1544339715
 }
][
 {
   "Unix": 1544339720
 }
]^C
```

The query will never terminate, instead the clock() plugin will emit a
new timestamp every 5 seconds. Note the \--max\_wait flag which tells
Velociraptor to wait at least for 1 second in order to batch rows before
reporting them.

This query is not very interesting! Let\'s do something more
interesting. GRR has a feature where each client sends its own CPU use
and memory footprint sampled every minutes to the server. This is a
really useful feature because it can be used to make sure the client\'s
impact on the host\'s performance is minimal.

Let us implement the same feature with a VQL query. What we want is to
measure the client\'s footprint every minute and send that to the
server:

``` {.sourceCode .psql}
SELECT * from foreach(
 row={
   SELECT UnixNano FROM clock(period=60)
 },
 query={
   SELECT UnixNano / 1000000000 as Timestamp,
          Times.user + Times.system as CPU,
          MemoryInfo.RSS as RSS
   FROM pslist(pid=getpid())
 })
```

This query runs the clock() VQL plugin and for each row it emits, we run
the pslist() plugin, extracting the total CPU time (system + user) used
by our own pid (i.e. the Velociraptor client).

We can now encapsulate this query in an
[artifact](/blog/html/reference/artifacts.html#generic-client-stats) and
collect it:

``` {.sourceCode .bash}
$ velociraptor artifacts collect Generic.Client.Stats --max_wait 1 --format json
[][
  {
  "CPU": 0.06999999999999999,
  "RSS": 18866176,
  "Timestamp": 1544340582.9939497
  }
][
  {
  "CPU": 0.09,
  "RSS": 18866176,
  "Timestamp": 1544340602.9944408
  }
]^C
```

::: {.note}
::: {.admonition-title}
Note
:::

You must specify the \--format json to be able to see the results from
event queries on the command line. Otherwise Velociraptor will try to
get all the results so it can format them in a table and never return
any results.
:::

Installing the event collector.
===============================

In order to have clients collect this event, we need to add the artifact
to the server. Simply add the YAML file into a directory on the server
and start the server with the \--definitions flag. Then simply add the
event name to the Events clause of the server configuration. When
clients connect to the server they will automatically start collecting
these events and sending them to the server:

``` {.sourceCode .bash}
$ velociraptor --definitions path/to/my/artifacts/ frontend
```

``` {.sourceCode .yaml}
Events:
  artifacts:
  - Generic.Client.Stats
  version: 2
```

Note that we do not need to redeploy any clients, modify any code or
recompile anything. We simply add the new artifact definition and
clients will automatically start monitoring and feeding back our
information.

The data is sent to the server where it is stored in a file (Events are
stored in a unique file for each day).

For example, the path
/var/lib/velociraptor/clients/C.772d16449719317f/monitoring/Artifact%20Generic.Client.Stats/2018-12-10
stores all events collected from client id C.772d16449719317f for the
Generic.Client.Stats artifact on the day of 2018-12-10.

In the next blog post we will demonstrate how these events can be post
processed and acted on. It is important to note that the Velociraptor
server does not interpret the collected monitoring events at all -they
are simply appended to the daily log file (which is a CSV file).

The CSV file can then be imported into basically any tool designed to
work with tabular data (e.g. spreadsheets, databases, BigQuery etc). CSV
is almost universally supported by all major systems.

``` {.sourceCode .text}
Timestamp,CPU,RSS
1544363561.8001275,14.91,18284544
1544363571.8002906,14.91,18284544
1544363581.8004665,14.920000000000002,18284544
1544363591.8007126,14.920000000000002,18284544
1544363601.8008528,14.920000000000002,18284544
```
