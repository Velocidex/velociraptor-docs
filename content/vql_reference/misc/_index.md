---
title: Misc
weight: 70
linktitle: Misc
index: true
---

Miscellaneous plugins not yet categorized.


<div class="vql_item"></div>


## hunt_delete
<span class='vql_type pull-right'>Plugin</span>

Delete a hunt. 



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hunt_id||string (required)
really_do_it||bool



<div class="vql_item"></div>


## query
<span class='vql_type pull-right'>Plugin</span>

Evaluate a VQL query.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|string (required)
env|A dict of args to insert into the scope.|ordereddict.Dict

