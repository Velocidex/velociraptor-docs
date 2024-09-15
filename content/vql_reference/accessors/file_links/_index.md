---
title: file_links
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## file_links
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access the filesystem using the OS APIs.

Note: Take care with this accessor because there may be circular
links. In particular this is dangerous on Linux when accidentally
entering the `/proc` part of the filesystem because it contains
circular links to everywhere.


