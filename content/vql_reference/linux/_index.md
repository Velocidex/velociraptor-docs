---
title: Linux Specific
weight: 20
linktitle: Linux
index: true
---

Many VQL plugins and functions provide access to the Linux
APIs. The following are only available when running on Linux.


<div class="vql_item"></div>


## audit
<span class='vql_type pull-right'>Plugin</span>

Register as an audit daemon in the kernel.

On Linux the audit subsystem provides real time information about
kernel auditable events. This plugin registers as a consumer and
returns parsed events as rows.

You should configure the audit subsystem using the `auditctl`
binary before using this plugin.


