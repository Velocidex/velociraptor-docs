---
title: Windows.Sys.DiskInfo
hidden: true
tags: [Client Artifact]
---

Retrieve basic information about the physical disks of a system.

<pre><code class="language-yaml">
name: Windows.Sys.DiskInfo
description: Retrieve basic information about the physical disks of a system.
sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
        SELECT Partitions,
               Index as DiskIndex,
               InterfaceType as Type,
               PNPDeviceID,
               DeviceID,
               Size,
               Manufacturer,
               Model,
               Name,
               SerialNumber,
               Description
        FROM wmi(
           query=&quot;SELECT * from Win32_DiskDrive&quot;,
           namespace=&quot;ROOT\\CIMV2&quot;)

</code></pre>

