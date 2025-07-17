---
title: source
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## source
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string
flow_id|A flow ID (client or server artifacts)|string
hunt_id|Retrieve sources from this hunt (combines all results from all clients)|string
artifact|The name of the artifact collection to fetch|string
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|Any
end_time|Stop end events reach this time (event sources).|Any
notebook_id|The notebook to read from (should also include cell id)|string
notebook_cell_id|The notebook cell read from (should also include notebook id)|string
notebook_cell_version|The notebook cell version to read from (should also include notebook id and notebook cell)|string
notebook_cell_table|A notebook cell can have multiple tables.)|int64
start_row|Start reading the result set from this row|int64
count|Maximum number of rows to fetch (default unlimited)|int64
orgs|Run the query over these orgs. If empty use the current org.|list of string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>

### Description

Retrieve rows from an artifact's source.

This plugin is mostly useful in notebooks. It attempts to do the
right thing automatically by inferring many parameters from its
execution environment.

The goal with this plugin is to reduce the boiler plate code
required by inferring many of the parameters from the notebook
environment. The `source()` plugin serves as a proxy to other more
specific plugins such as `hunt_results()` and `flow_results()`.

For example, when running within a collection notebook, the GUI
will automatically pass the `ClientId`, `FlowId` and `Artifact`
parameters to the notebook environment. Therefore it is not
necessary to specify those at all:

```vql
-- Artifact, ClientId and FlowId are populated from the notebook context.
SELECT * FROM source()
```

On the other hand, when running the above query in a hunt
notebook, the `HuntId` will be available in the notebook context,
therefore the `source()` plugin will be equivalent to the
`hunt_results()` plugin.

When accessing another notebook cell, both the `notebook_id` and
`notebook_cell` parameters must be explicitly specified:

```vql
SELECT * FROM source(notebook_id="N.123", notebook_cell="NC.1234")
```
