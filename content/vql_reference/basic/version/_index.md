---
title: version
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## version
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
function||string
plugin||string

### Description

Gets the version of a VQL plugin or function.

This is useful when writing portable VQL which can work with
older versions of Velociraptor. When Velociraptor plugins evolve
in an incompatible way their version is incremented. It is
possible to cater for multiple versions in the VQL using an if()
plugin.

For example the following can chose from a legacy query or a
modern query based on the plugin version:

```vql
 SELECT * FROM if(
  condition=version(plugin="glob") >= 1,
  then=NewQuery,
  else=LegacyQuery)
```


