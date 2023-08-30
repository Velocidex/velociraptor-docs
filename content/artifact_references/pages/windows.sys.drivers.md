---
title: Windows.Sys.Drivers
hidden: true
tags: [Client Artifact]
---

Details for in-use Windows device drivers. This does not display
installed but unused drivers.


<pre><code class="language-yaml">
name: Windows.Sys.Drivers
description: |
  Details for in-use Windows device drivers. This does not display
  installed but unused drivers.

precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: AlsoCheckAuthenticode
    type: bool
    description: If selected we also check the authenticode information.
    default: &quot;Y&quot;

sources:
  - name: SignedDrivers
    query: |
       SELECT *
       FROM wmi(
          query=&quot;select * from Win32_PnPSignedDriver&quot;,
          namespace=&quot;ROOT\\CIMV2&quot;)

  - name: RunningDrivers
    query: |
       SELECT *, if(
         condition=AlsoCheckAuthenticode,
         then=authenticode(filename=PathName)) AS Authenticode,
         hash(path=PathName) AS Hashes
       FROM wmi(
         query=&quot;select * from Win32_SystemDriver&quot;,
         namespace=&quot;ROOT\\CIMV2&quot;)
    notebook:
      - type: vql_suggestion
        name: Unique issuers
        template: |
          /*
          # Unique Issuers of drivers

          These are the unique signers of drivers on a system
          (excluding microsoft drivers).

          */
          SELECT count() AS Count,
                 enumerate(items=Name) AS Names,
                 Authenticode.IssuerName AS Issuer, Hashes
          FROM source(artifact=&quot;Windows.Sys.Drivers/RunningDrivers&quot;)
          WHERE NOT Issuer =~ &quot;Microsoft&quot;
          GROUP BY Issuer

</code></pre>

