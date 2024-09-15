---
title: me
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## me
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access files bundled inside the Velociraptor binary itself.

The `me` accessor is used to retrieve files packed inside the
Velociraptor binary (for example in the offline
collector). Currently this is similar to the zip accessor but it
might change in future. Do not use this accessor directly, instead
use the supported `Generic.Utils.FetchBinary` artifact to retrieve
packed files.

This is used for unpacking extra files delivered by the Offline
Collector and is probably not generally useful.


