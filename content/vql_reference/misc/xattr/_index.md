---
title: xattr
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## xattr
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|Filename to inspect.|OSPath (required)
attribute|Attribute to collect.|list of string
accessor|File accessor|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

{{% notice note %}}

This function is not available in the current release of Velociraptor, and 
    will be available in 0.7.2

{{% /notice %}}

Query a file for the specified extended attribute. If no attributes are provided, 
the function will return all extended attributes on the file. 

{{% notice note %}}

  Please note that the list function is currently unreliable, and will often 
  error out. Where possible, please provide a list of extended attributes to collect
  rather than listing all extended attributes. 

{{% /notice %}}