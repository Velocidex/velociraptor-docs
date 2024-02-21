---
title: watch_etw
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_etw
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|A session name |string
guid|A Provider GUID to watch |string (required)
any|Any Keywords |uint64
all|All Keywords |uint64
level|Log level (0-5)|int64
stop|If provided we stop watching automatically when this lambda returns true|Lambda
timeout|If provided we stop after this much time|uint64

### Description

Watch for events from an ETW provider.

