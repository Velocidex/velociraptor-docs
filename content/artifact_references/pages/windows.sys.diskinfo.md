---
title: Windows.Sys.DiskInfo
description: "Collects physical disk drive information including model, serial\nnumber, size, and interface type via WMI.\n"
type: docs-no-toc
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
build:
  list: never
---

Collects physical disk drive information including model, serial
number, size, and interface type via WMI.


---

````yaml
name: Windows.Sys.DiskInfo
description: |
  Collects physical disk drive information including model, serial
  number, size, and interface type via WMI.

sources:
  - precondition:
      SELECT OS From info() where OS = 'windows'
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
           query="SELECT * from Win32_DiskDrive",
           namespace="ROOT\\CIMV2")
````


