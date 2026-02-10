---
title: info
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## info
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>


<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Get information about the running host.

This plugin returns a single row with information about the current
system. The information includes the Hostname, Uptime, OS, Platform
etc.

This plugin is very useful in preconditions as it restricts a
query to certain OS or versions.

This plugin leverages the [gopsutil
library](https://github.com/shirou/gopsutil) on many
platforms. The type of information reported is subtly different
and we aim to document some of this below.

## Common fields

The `Fqdn` field is the fully qualified domain name. This is
obtained by performing a reverse DNS lookup for the main interface
address. Note that is not always the same as the hostname, as it
relies on what other systems consider the machine's name is. This
can be especially problematic when `DHCP` is used and dns names
are assigned based on IP leases. Another example we see is when
`Docker` is installed and the hosts file is changed to provide
different names than the hostname.

You should probably not rely too much on the `Fqdn` field, and use
the `Hostname` field instead.

## Windows Platform

On Windows, the `KernelVersion` field is derived from the output
of `RtlGetVersion` which bypasses Windows' compatibility layer to
report the true kernel version.

Other information is derived from the Registry Key
`HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion`:

* The build number is read from the value `UBR`

* The `PlatformVersion` is read from the value `DisplayVersion` - it
  may be missing from some older Windows systems.

* The `PlatformFamily` is derived from the product type field of
  `RtlGetVersion` and can be Workstation, Domain Controller or
  Server.

* The `HostId` field should represent a reliable unique ID for the
  host. We read it from
  `HKLM\SOFTWARE\Microsoft\Cryptography\MachineGuid`. The value
  may be used to correlate the Velociraptor client id with other
  systems

* The `Architecture` field reflects the binary's built
  architecture (`amd64` for 64 bit or `x86` for 32 bit).

  A special case is when a 32 bit binary is running on a 64 bit
  system (as determined by the `PROCESSOR_ARCHITEW6432`
  environment variable), in which case we report the
  `Architecture` as `wow64`. Note that this configuration is not
  supported and may lead to crashes and undetermined behavior!


