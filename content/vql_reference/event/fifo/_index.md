---
title: fifo
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## fifo
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Source for cached rows.|StoredQuery (required)
max_age|Maximum number of seconds to hold rows in the fifo.|int64
max_rows|Maximum number of rows to hold in the fifo.|int64
flush|If specified we flush all rows from cache after the call.|bool

### Description

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

```vql
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


