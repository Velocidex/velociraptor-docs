---
title: ip
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## ip
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
netaddr4_le|A network order IPv4 address (as little endian).|int64
netaddr4_be|A network order IPv4 address (as big endian).|int64

### Description

Format an IP address.

Converts an ip address encoded in various ways. If the IP address is
encoded as 32 bit integer we can use netaddr4_le or netaddr4_be to
print it in a human readable way.

This currently does not support IPv6 addresses. Those are usually
encoded as an array of 8 bytes which makes it easy to format using the
`format()` function:

```vql
  format(format="%x:%x:%x:%x:%x:%x:%x:%x", value)
```


