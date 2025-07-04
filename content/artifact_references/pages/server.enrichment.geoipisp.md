---
title: Server.Enrichment.GeoIPISP
hidden: true
tags: [Server Artifact]
---

This artifact can use the MaxMind database to Geo resolve an IP
address using the GeoIP ISP Database. You will need to provide a valid GeoIP ISP database.

You can obtain a free to use (gratis but not libre) database from
https://www.maxmind.com/ or you can pay for a more accurate option.

After storing the database somewhere on your server, you should the
location in the server metadata screen to it under the key "GeoIPISPDB"
(for example `/usr/shared/GeoIP2-City_20210910/GeoIP2-ISP.mmdb`)

Alternatively you can import this artifact to gain access to the
utility functions (or just copy them into your own artifact).


<pre><code class="language-yaml">
name: Server.Enrichment.GeoIPISP
description: |
  This artifact can use the MaxMind database to Geo resolve an IP
  address using the GeoIP ISP Database. You will need to provide a valid GeoIP ISP database.

  You can obtain a free to use (gratis but not libre) database from
  https://www.maxmind.com/ or you can pay for a more accurate option.

  After storing the database somewhere on your server, you should the
  location in the server metadata screen to it under the key "GeoIPISPDB"
  (for example `/usr/shared/GeoIP2-City_20210910/GeoIP2-ISP.mmdb`)

  Alternatively you can import this artifact to gain access to the
  utility functions (or just copy them into your own artifact).

export: |
  LET ISPDB = server_metadata().GeoIPISPDB
  LET ISP(IP) = geoip(db=ISPDB, ip=IP).isp
  LET ORG(IP) = geoip(db=ISPDB, ip=IP).organization
  LET ASN(IP) = geoip(db=ISPDB, ip=IP).autonomous_system_number
  LET ASO(IP) = geoip(db=ISPDB, ip=IP).autonomous_system_organization

parameters:
  - name: IP
    description: An IP to lookup

type: SERVER

sources:
  - query: |
      SELECT ISP(IP=_value) AS ISP,
             ORG(IP=_value) AS Organization,
             ASN(IP=_value) AS ASN,
             ASO(IP=_value) AS ASO
      FROM foreach(row=IP)

</code></pre>

