---
title: hunt_info
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## hunt_info
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id|Hunt Id to look up or a flow id created by that hunt (e.g. F.CRUU3KIE5D73G.H ).|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">READ_RESULTS</span>

### Description

Retrieve the hunt information.

This function is a convenience function to the full hunts()
plugin, and can retrieve the hunt information for a specific hunt
id. As a convenience, the function will also accept a flow id for
flows which were launched by the hunt. These flow IDs have a
specific format indicating they were launched from a hunt.


