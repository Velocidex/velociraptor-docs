---
title: geoip
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## geoip
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
ip|IP Address to lookup.|string (required)
db|Path to the MaxMind GeoIP Database.|string (required)

### Description

Lookup an IP Address using the MaxMind GeoIP database. You can get
a copy of the database from https://www.maxmind.com/. The database
must be locally accessible so this probably only makes sense on
the server.


