---
title: Misc
weight: 70
linktitle: Misc
index: true
---

Miscellaneous plugins not yet categorized.


<div class="vql_item"></div>


## parse_pkcs7
<span class='vql_type pull-right'>Function</span>

Parse a DER encoded pkcs7 string into an object.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|PKCS7 DER encoded string.|string (required)



<div class="vql_item"></div>


## query
<span class='vql_type pull-right'>Plugin</span>

Evaluate a VQL query.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|string (required)
env|A dict of args to insert into the scope.|ordereddict.Dict

