---
title: collect_client
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## collect_client
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to schedule a collection on|string (required)
artifacts|A list of artifacts to collect|list of string (required)
env|Parameters to apply to the artifact (an alternative to a full spec)|Any
spec|Parameters to apply to the artifacts|Any
timeout|Set query timeout (default 10 min)|uint64
ops_per_sec|Set query ops_per_sec value|float64
cpu_limit|Set query cpu_limit value|float64
iops_limit|Set query iops_limit value|float64
max_rows|Max number of rows to fetch|uint64
max_bytes|Max number of bytes to upload|uint64
urgent|Set the collection as urgent - skips other queues collections on the client.|bool
org_id|If set the collection will be started in the specified org.|string

### Description

Launch an artifact collection against a client. If the client_id
is "server" then the collection occurs on the server itself. In
that case the caller needs the SERVER_ADMIN permission.

There are two way of specifying how to collect the artifacts. The
simplest way is to specify the environment string using the `env`
parameter, and a list of artifacts to collect in the `artifacts`
parameter.

In this case all artifacts will receive the the same
parameters. For example:

```vql
SELECT collect_client(
    client_id='C.11a3013ccaXXXXX',
    artifacts='Windows.KapeFiles.Targets',
    env=dict(Device ='C:', VSSAnalysis='Y', KapeTriage='Y')).request AS Flow
FROM scope()
```

Sometimes we have a number of artifacts that use the same
parameter name for different purposes. In that case we wish to
specify precisely which artifact receives which parameter. This
more complex way of specifying the collection using the `spec`
parameter:

```vql
SELECT collect_client(
    client_id='C.11a3013ccaXXXXX',
    artifacts='Windows.KapeFiles.Targets',
    spec=dict(`Windows.KapeFiles.Targets`=dict(
        Device ='C:', VSSAnalysis='Y', KapeTriage='Y'))).request AS Flow
FROM scope()
```

In this case the artifact names are repeated in the spec and the
artifacts parameter.

NOTE: When constructing the dictionaries for the spec parameter
you will often need to specify a field name containing full
stop. You can escape this using the backticks like the example above.


