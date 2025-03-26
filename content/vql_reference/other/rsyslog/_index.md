---
title: rsyslog
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## rsyslog
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
port|Destination port to connect to. If not specified we use 514|uint64
protocol|Protocol to use, default UDP but can be TCP or TLS|string
message|Message to log.|string (required)
facility|Facility of this message|int64
severity|Severity of this message|int64
timestamp|Timestamp of this message, if omitted we use the current time.|time.Time
hostname|Hostname associated with this message. If omitted we use the current hostname.|string
app_name|Application that generated the log|string
proc_id|Process ID that generated this log|string
sd_id|When sending structured data, this is the Structured Data ID|string
args|A dict to be interpolated into the message as structured data, according to RFC5424.|ordereddict.Dict
root_ca|As a better alternative to disable_ssl_security, allows root ca certs to be added here.|string

### Description

Send an RFC5424 compliant remote syslog message.

