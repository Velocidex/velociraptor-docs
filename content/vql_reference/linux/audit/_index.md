---
title: audit
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## audit
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>


<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">MACHINE_STATE</span>

### Description

Register as an audit daemon in the kernel.

On Linux the audit subsystem provides real time information about
kernel auditable events. This plugin registers as a consumer and
returns parsed events as rows.

You should configure the audit subsystem using the `auditctl`
binary before using this plugin.


