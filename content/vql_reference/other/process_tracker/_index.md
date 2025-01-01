---
title: process_tracker
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## process_tracker
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
sync_query|Source for full tracker updates. Query must emit rows with the ProcessTrackerUpdate shape - usually uses pslist() to form a full sync.|StoredQuery
sync_period|How often to do a full sync (default 5000 msec).|int64
update_query|An Event query that produces live updates of the tracker state.|StoredQuery
max_size|Maximum size of process tracker LRU.|int64
enrichments|One or more VQL lambda functions that can enrich the data for the process.|list of string

### Description

Install a global process tracker.

The process tracker is an in-memory cache. It has a limited size with older
records being expired. This LRU cache size is controlled by the `max_size`
argument. The default is 10k records.

The tracker has two queries: a sync_query and an update_query. The update
query resets the internal database.


