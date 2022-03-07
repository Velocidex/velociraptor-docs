---
title: authenticode
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## authenticode
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
accessor|The accessor to use.|string
filename|The filename to parse.|OSPath (required)
verbose|Set to receive verbose information about all the certs.|bool

### Description

This plugin parses authenticode information from PE files.

On windows, the plugin will also use the windows API to determine
if the binary is trusted by the system.


