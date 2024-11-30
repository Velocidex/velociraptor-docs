---
title: dns
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## dns
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>


### Description

Monitor dns queries.

This plugin opens a raw socket and monitors network traffic for
DNS questions and answers.

{{% notice note %}}

When Velociraptor attempts to open a raw socket, sometimes Windows
Defender treats that as suspicious behavior and quarantines the
Velociraptor binary. This can be avoided by signing the binary which
signals to Windows Defender that the binary is legitimate.

If you do not intend to build Velociraptor from source, use the
official signed Velociraptor binaries which should not trigger alerts
from Windows Defender.

{{% /notice %}}

It is generally better to use ETW for DNS monitoring than this
plugin (see Windows.Events.DNSQueries)


