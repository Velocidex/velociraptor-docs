---
title: Server.Enrichment.GeoIP
hidden: true
tags: [Server Artifact]
---

This artifact can use the MaxMind database to Geo resolve an IP
address. You will need to provide a valid GeoIP database.

You can obtain a free to use (gratis but not libre) database from
https://www.maxmind.com/ or you can pay for a more accurate option.

After storing the database somewhere on your server, you should the
location in the server metadata screen to it under the key "GeoIPDB"
(for example `/usr/shared/GeoLite2-City_20210803/GeoLite2-City.mmdb`)

Alternatively you can import this artifact to gain access to the
utility functions (or just copy them into your own artifact).


<pre><code class="language-yaml">
name: Server.Enrichment.GeoIP
description: |
  This artifact can use the MaxMind database to Geo resolve an IP
  address. You will need to provide a valid GeoIP database.

  You can obtain a free to use (gratis but not libre) database from
  https://www.maxmind.com/ or you can pay for a more accurate option.

  After storing the database somewhere on your server, you should the
  location in the server metadata screen to it under the key "GeoIPDB"
  (for example `/usr/shared/GeoLite2-City_20210803/GeoLite2-City.mmdb`)

  Alternatively you can import this artifact to gain access to the
  utility functions (or just copy them into your own artifact).

export: |
  LET DB = server_metadata().GeoIPDB
  LET Country(IP) = geoip(db=DB, ip=IP).country.names.en
  LET State(IP) = geoip(db=DB, ip=IP).subdivisions[0].names.en
  LET City(IP) = geoip(db=DB, ip=IP).city.names.en

parameters:
  - name: IP
    description: An IP to lookup

type: SERVER

sources:
  - query: |
      SELECT Country(IP=_value) AS Country,
             State(IP=_value) AS State,
             City(IP=_value) AS City
      FROM foreach(row=IP)

</code></pre>

