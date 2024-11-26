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

