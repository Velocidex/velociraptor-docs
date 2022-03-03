---
title: cidr_contains
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## cidr_contains
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
ip|An IP address|string (required)
ranges|A list of CIDR notation network ranges|list of string (required)

### Description

Calculates if an IP address falls within a range of CIDR specified
networks.

```vql
SELECT cidr_contains(ip="192.168.0.132", ranges=[
    "192.168.0.0/24", "127.0.0.1/8"])
FROM scope()
```


