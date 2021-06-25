---
title: Misc
weight: 70
linktitle: Misc
index: true
---

Miscelanueous plugins not yet categorized.


<div class="vql_item"></div>


## amsi
<span class='vql_type pull-right'>Function</span>





<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to scan|string (required)



<div class="vql_item"></div>


## column_filter
<span class='vql_type pull-right'>Plugin</span>

Select columns from another query using regex.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|This query will be run to produce the columns.|StoredQuery (required)
exclude|One of more regular expressions that will exclude columns.|list of string
include|One of more regular expressions that will include columns.|list of string



<div class="vql_item"></div>


## import_collection
<span class='vql_type pull-right'>Function</span>

Imports an offline collection zip file (experimental).



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id|The client id to import to. Use 'auto' to generate a new client id.|string (required)
hostname|When creating a new client, set this as the hostname.|string
filename|Path on server to the collector zip.|string (required)
accessor|The accessor to use|string



<div class="vql_item"></div>


## parse_pkcs7
<span class='vql_type pull-right'>Function</span>

Parse a DER encoded pkcs7 string into an object.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|PKCS7 DER encoded string.|string (required)



<div class="vql_item"></div>


## parse_x509
<span class='vql_type pull-right'>Function</span>

Parse a DER encoded x509 string into an object.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|X509 DER encoded string.|string (required)



<div class="vql_item"></div>


## parse_yaml
<span class='vql_type pull-right'>Function</span>

Parse yaml into an object.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|Yaml Filename|string (required)
accessor|File accessor|string



<div class="vql_item"></div>


## query
<span class='vql_type pull-right'>Plugin</span>

Evaluate a VQL query.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|string (required)
env|A dict of args to insert into the scope.|Any



<div class="vql_item"></div>


## range
<span class='vql_type pull-right'>Plugin</span>

Iterate over range.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
start|Start index (0 based)|int64 (required)
end|End index (0 based)|int64 (required)
step|End index (0 based)|int64 (required)



<div class="vql_item"></div>


## relpath
<span class='vql_type pull-right'>Function</span>

Return the relative path of .



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|string (required)
base|The base of the path|string (required)
sep|Separator to use (default native)|string



<div class="vql_item"></div>


## slice
<span class='vql_type pull-right'>Function</span>

Slice an array.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
list|A list of items to slice|Any (required)
start|Start index (0 based)|uint64 (required)
end|End index (0 based)|uint64 (required)



<div class="vql_item"></div>


## sql
<span class='vql_type pull-right'>Plugin</span>

Run queries against sqlite, mysql, and postgres databases



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
driver|sqlite, mysql,or postgres|string (required)
connstring|SQL Connection String|string
file|Required if using sqlite driver|string
accessor|The accessor to use if using sqlite|string
query||string (required)
args||Any



<div class="vql_item"></div>


## substr
<span class='vql_type pull-right'>Function</span>

Create a substring from a string



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
str|The string to shorten|string (required)
start|Beginning index of substring|int
end|End index of substring|int



<div class="vql_item"></div>


## sum
<span class='vql_type pull-right'>Function</span>

Sums the items.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||int64 (required)



<div class="vql_item"></div>


## unhex
<span class='vql_type pull-right'>Function</span>

Apply hex decoding to the string.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|Hex string to decode|string



<div class="vql_item"></div>


## unzip
<span class='vql_type pull-right'>Plugin</span>

Unzips a file into a directory



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|File to unzip.|string (required)
accessor|The accessor to use|string
filename_filter|Only extract members matching this filter.|string
output_directory|Where to unzip to|string (required)



<div class="vql_item"></div>


## whoami
<span class='vql_type pull-right'>Function</span>

Returns the username that is running the query.

