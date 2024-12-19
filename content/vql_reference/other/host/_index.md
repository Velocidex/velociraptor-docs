---
title: host
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## host
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|The name to lookup|string (required)
server|A DNS server to query - if not provided uses the system resolver.|string
type|Type of lookup, can be CNAME, NS, SOA, TXT, DNSKEY, AXFR, A (default)|string
prefer_go|Prefer calling the native Go implementation rather than the system.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Perform a DNS resolution.

This function allows DNS to be resolved from within VQL. You can
use the regular system resolver (for example on windows will go
through the resolver cache service).

You can also specify an external DNS server, causing the query to
contact the DNS server for resolving the names.

### Example

The first query resolves through an external DNS server
while the second uses the local resolver.

```
SELECT host(name='www.google.com', server='8.8.8.8:53'),
   host(name='www.google.com')
FROM scope()
```

### Notes

No caching is currently provided so this may generate a lot
of load on DNS servers when scanning many rows.


