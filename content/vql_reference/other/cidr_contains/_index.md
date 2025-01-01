---
title: cidr_contains
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## cidr_contains
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
ip|An IP address|string (required)
ranges|A list of CIDR notation network ranges|list of string (required)

### Description

Calculates if an IP address falls within a range of CIDR specified
networks.

### Example

```vql
SELECT cidr_contains(ip="192.168.0.132",
                     ranges=["192.168.0.0/24", "127.0.0.1/8"])
FROM scope()
```
### See also

- [ip]({{< ref "/vql_reference/other/ip/" >}}): Format an IP address.
- [geoip]({{< ref "/vql_reference/other/geoip/" >}}): Lookup an IP Address
  using the MaxMind GeoIP database.


