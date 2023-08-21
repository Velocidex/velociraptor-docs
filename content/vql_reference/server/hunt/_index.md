---
title: hunt
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## hunt
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
description|Description of the hunt|string
artifacts|A list of artifacts to collect|list of string (required)
expires|A time for expiry (e.g. now() + 1800)|LazyExpr
spec|Parameters to apply to the artifacts|Any
timeout|Set query timeout (default 10 min)|uint64
ops_per_sec|Set query ops_per_sec value|float64
cpu_limit|Set query ops_per_sec value|float64
iops_limit|Set query ops_per_sec value|float64
max_rows|Max number of rows to fetch|uint64
max_bytes|Max number of bytes to upload|uint64
pause|If specified the new hunt will be in the paused state|bool
include_labels|If specified only include these labels|list of string
exclude_labels|If specified exclude these labels|list of string
os|If specified target this OS|string
org_id|If set the collection will be started in the specified orgs.|list of string

Required Permissions: 
<i class="linkcolour label pull-right label-success">START_HUNT</i>
<i class="linkcolour label pull-right label-success">ORG_ADMIN</i>

### Description

Create and launch a hunt.

This function will create a new hunt to collect the specified
artifacts. The artifacts to collect are provided in the
`artifacts` parameter. Artifact parameters are provided in the
`spec` parameter (see example below).

### NOTES

1. In the GUI hunts are always created in the paused
state. This is not the default state when using this function (all
hunts are immediately active - if you want the hunt to be created
in the paused state provide the `pause=TRUE` parameter).

2. The expiry time is specified in any of the usual time
specification ways (seconds since epoch, or ISO format like
"2021-10-02"). If the expiry time is in the past, the hunt will
not be created.

```vql
SELECT hunt(
    description="A general hunt",
    artifacts='Windows.KapeFiles.Targets',
    spec=dict(`Windows.KapeFiles.Targets`=dict(
        Device ='C:', VSSAnalysis='Y', KapeTriage='Y')),
    expires=now() + 18000)
FROM scope()
```


