---
title: geoip
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Lookup an IP Address using the MaxMind GeoIP database.

  You can get a copy of the database from https://www.maxmind.com/.

  The database must be locally accessible so geoip lookup is typically done
  only on the server.

  ### See also

  - [cidr_contains]({{< ref "/vql_reference/other/cidr_contains/" >}}):
    Calculates if an IP address falls within a range of CIDR specified
    networks.
  - [ip]({{< ref "/vql_reference/other/ip/" >}}): Format an IP address.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
ip|IP Address to lookup.|string (required)
db|Path to the MaxMind GeoIP Database.|string (required)

**Required permissions:** `FILESYSTEM_READ`

### Description

Lookup an IP Address using the MaxMind GeoIP database.

You can get a copy of the database from https://www.maxmind.com/.

The database must be locally accessible so geoip lookup is typically done
only on the server.

### See also

- [cidr_contains]({{< ref "/vql_reference/other/cidr_contains/" >}}):
  Calculates if an IP address falls within a range of CIDR specified
  networks.
- [ip]({{< ref "/vql_reference/other/ip/" >}}): Format an IP address.


