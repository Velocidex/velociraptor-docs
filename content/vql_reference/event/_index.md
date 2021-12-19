---
title: Event Plugins
weight: 50
linktitle: Event Plugins
index: true
---

VQL Event plugins are plugins which never terminate - but instead
generate rows based on events. Event plugins are useful for creating
client monitoring artifacts. Currently, client side monitoring
artifacts are specified in the `Events` section of the server
configuration file. When clients connect to the server, they receive a
list of monitoring artifacts they are to run. The client runs all
artifacts in parallel and their results are streamed to the server.


<div class="vql_item"></div>


## clock
<span class='vql_type pull-right'>Plugin</span>

Generate a timestamp periodically. This is mostly useful for event
queries.

This plugin generates events periodically. The periodicity can be
controlled either via the `period` or the `ms` parameter. Each row
will be a go [time.Time](https://golang.org/pkg/time/#Time)
object. You can access its unix epoch time with the Sec column.

### Example

The following will generate an event every 10 seconds.

```sql
SELECT Sec FROM clock(period=10)
```

The `start` parameter can be used to schedule the plugin to start
at a particular time. This can be an integer (which will be
interpreted as seconds since the epoch), a string or a time value.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
start|Start at this time.|Any
period|Wait this many seconds between events.|int64
ms|Wait this many ms between events.|int64



<div class="vql_item"></div>


## combine
<span class='vql_type pull-right'>Plugin</span>

Combine the output of several queries into the same result set.A convenience plugin acting like chain(async=TRUE).



<div class="vql_item"></div>


## diff
<span class='vql_type pull-right'>Plugin</span>

Executes 'query' periodically and emit differences from the last query.

The `diff()` plugin runs a non-event query periodically and calculates
the difference between its result set from the last run.

This can be used to create event queries which watch for changes from
simpler non-event queries.

The `key` parameter is the name of the column which is used to
determine row equivalency.

{{% notice note %}}

There is only a single equivalence column specified by the `key`
parameter, and it must be a string. If you need to watch multiple
columns you need to create a new column which is the concatenation
of other columns. For example `format(format="%s%d", args=[Name,
Pid])`

{{% /notice %}}

### Example

The following VQL monitors all removable drives and lists files on
newly inserted drives, or files that have been added to removable
drives.

```sql
LET removable_disks = SELECT Name AS Drive, Size
FROM glob(globs="/*", accessor="file")
WHERE Data.Description =~ "Removable"

LET file_listing = SELECT FullPath, Mtime As Modified, Size
FROM glob(globs=Drive+"\\**", accessor="file") LIMIT 1000

SELECT * FROM diff(
  query={ SELECT * FROM foreach(row=removable_disks, query=file_listing) },
  key="FullPath",
  period=10)
  WHERE Diff = "added"
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for cached rows.|StoredQuery (required)
key|The column to use as key.|string (required)
period|Number of seconds between evaluation of the query.|int64



<div class="vql_item"></div>


## fifo
<span class='vql_type pull-right'>Plugin</span>

Executes 'query' and cache a number of rows from it. For each invocation
we present the set of past rows.

The `fifo()` plugin allows for VQL queries to apply across historical
data. The fifo plugin accepts another event query as parameter, then
retains the last `max_rows` rows from it in an internal queue. Every
subsequent evaluation from the query will return the full set of rows
in the queue. Older rows are expired from the queue according to the
`max_age` parameter.

Fifos are usually used to form queries that look for specific pattern
of behavior. For example, a successful logon followed by failed
logons. In this case the fifo retains the recent history of failed
logons in its internal queue, then when a successful logon occurs we
can check the recent failed ones in its queue.

### Example

The following checks for 5 failed logons followed by a successful
logon.

```sql
LET failed_logon = SELECT EventData as FailedEventData,
   System as FailedSystem
FROM watch_evtx(filename=securityLogFile)
WHERE System.EventID.Value = 4625

LET last_5_events = SELECT FailedEventData, FailedSystem
    FROM fifo(query=failed_logon,
              max_rows=500,
              max_age=atoi(string=failedLogonTimeWindow))

LET success_logon = SELECT EventData as SuccessEventData,
   System as SuccessSystem
FROM watch_evtx(filename=securityLogFile)
WHERE System.EventID.Value = 4624

SELECT * FROM foreach(
  row=success_logon,
  query={
   SELECT SuccessSystem.TimeCreated.SystemTime AS LogonTime,
          SuccessSystem, SuccessEventData,
          enumerate(items=FailedEventData) as FailedEventData,
          FailedSystem, count(items=SuccessSystem) as Count
   FROM last_5_events
   WHERE FailedEventData.SubjectUserName = SuccessEventData.SubjectUserName
   GROUP BY LogonTime
      })  WHERE Count > atoi(string=failureCount)
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for cached rows.|StoredQuery (required)
max_age|Maximum number of seconds to hold rows in the fifo.|int64
max_rows|Maximum number of rows to hold in the fifo.|int64
flush|If specified we flush all rows from cache after the call.|bool



<div class="vql_item"></div>


## send_event
<span class='vql_type pull-right'>Function</span>

Sends an event to a server event monitoring queue.

This is used to send an event to a waiting server event monitoring
artifact (either as a VQL query running on the server or perhaps
an external program waiting for this event via the API.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact name to send the event to.|string (required)
row|The row to send to the artifact|ordereddict.Dict (required)



<div class="vql_item"></div>


## watch_auditd
<span class='vql_type pull-right'>Plugin</span>

Watch log files generated by auditd.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of string (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int



<div class="vql_item"></div>


## watch_csv
<span class='vql_type pull-right'>Plugin</span>

Watch a CSV file and stream events from it. Note: This is an event
plugin which does not complete.

This plugin is the event version of `parse_csv()`. When the CSV file
grows this plugin will emit the new rows.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|list of string (required)
accessor|The accessor to use|string
auto_headers|If unset the first row is headers|bool
separator|Comma separator (default ',')|string
comment|The single character that should be considered a comment|string
columns|The columns to use|list of string



<div class="vql_item"></div>


## watch_etw
<span class='vql_type pull-right'>Plugin</span>

Watch for events from an ETW provider.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|A session name |string
guid|A Provider GUID to watch |string (required)
any|Any Keywords |uint64
all|All Keywords |uint64
level|Log level (0-5)|int64



<div class="vql_item"></div>


## watch_evtx
<span class='vql_type pull-right'>Plugin</span>

Watch an EVTX file and stream events from it.

This is the Event plugin version of `parse_evtx()`.

{{% notice note %}}

It often takes several seconds for events to be flushed to the event
log and so this plugin's event may be delayed. For some applications
this results in a race condition with the event itself - for example,
files mentioned in the event may already be removed by the time the
event is triggered.

{{% /notice %}}




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of event log files to parse.|list of string (required)
accessor|The accessor to use.|string
messagedb|A Message database from https://github.com/Velocidex/evtx-data.|string



<div class="vql_item"></div>


## watch_monitoring
<span class='vql_type pull-right'>Plugin</span>

Watch clients' monitoring log. This is an event plugin. This
plugin will produce events from all clients.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact to watch|string



<div class="vql_item"></div>


## watch_syslog
<span class='vql_type pull-right'>Plugin</span>

Watch a syslog file and stream events from it. 



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of string (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int



<div class="vql_item"></div>


## watch_usn
<span class='vql_type pull-right'>Plugin</span>

Watch the USN journal from a device.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
device|The device file to open.|string (required)



<div class="vql_item"></div>


## wmi_events
<span class='vql_type pull-right'>Plugin</span>

Executes an evented WMI queries asynchronously.

This plugin sets up a [WMI event](https://docs.microsoft.com/en-us/windows/desktop/wmisdk/receiving-a-wmi-event) listener query.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|WMI query to run.|string (required)
namespace|WMI namespace|string (required)
wait|Wait this many seconds for events and then quit.|int64 (required)

