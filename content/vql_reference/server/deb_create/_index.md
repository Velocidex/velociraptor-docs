---
title: deb_create
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## deb_create
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
target|The name of the target OS to repack (default VelociraptorLinux)|string
version|Velociraptor Version to repack|string
release|Rpm package release version (A)|string
server|Build a server rpm if true, otherwise we build a client rpm|bool
exe|Alternative a path to the executable to repack|OSPath
accessor|The accessor to use to read the file.|string
config|The config to be repacked in the form of a json or yaml string. If not provided we use the current config./|string
show_spec|If set we only show the spec that would have been used. You can use this to customize the input for package_spec|bool
directory_name|Package files will be created inside this directory. If not specified we use a temporary directory|string
extra_args|Additional command line args to be provided to the service|list of string
package_spec|A Package spec to use instead of the default, for ultimate customization|ordereddict.Dict

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_SERVER</span>
<span class="permission_list linkcolour label label-important">FILESYSTEM_WRITE</span>
<span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Create a deployable Debian package for client or server.

