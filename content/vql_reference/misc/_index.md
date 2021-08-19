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

AMSI is an interface on windows to scan a string for malware. This
function submits the string to the AMSI system and receives a
determination if it is malware.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to scan|string (required)



<div class="vql_item"></div>


## atexit
<span class='vql_type pull-right'>Function</span>

Install a query to run when the query is unwound. This is used to
clean up when the query ends.

For example:

```vql
LET _ <= atexit(query={
  SELECT rm(filename="Foobar.txt") FROM scope()
})
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|Any (required)
env|A dict of args to insert into the scope.|ordereddict.Dict
timeout|How long to wait for destructors to run (default 60 seconds).|uint64



<div class="vql_item"></div>


## column_filter
<span class='vql_type pull-right'>Plugin</span>

Select columns from another query using regex.

Sometimes a query produces a large number of columns or
unpredictable column names (eg. the read_reg_key() plugin produces
a column per value name).

You can use the column_filter() plugin to select a subset of the
columns to include or exclude from an underlying query. For example:

```vql
SELECT * FROM column_filter(
query={
   SELECT 1 AS A, 2 AS B, 3 AS AB, 4 AS AA
   FROM scope()
}, include="A", exclude="B")
```

will include columns with the letter A in their name and remove
columns with the letter B (so it will have A and AA above).




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|This query will be run to produce the columns.|StoredQuery (required)
exclude|One of more regular expressions that will exclude columns.|list of string
include|One of more regular expressions that will include columns.|list of string



<div class="vql_item"></div>


## gcs_pubsub_publish
<span class='vql_type pull-right'>Function</span>

Publish a message to Google PubSub.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
topic|The topic to publish to|string (required)
project_id|The project id to publish to|string (required)
msg|Message to publish to Pubsub|Any (required)
credentials|The credentials to use|string (required)



<div class="vql_item"></div>


## geoip
<span class='vql_type pull-right'>Function</span>

Lookup an IP Address using the MaxMind GeoIP database. You can get
a copy of the database from https://www.maxmind.com/. The database
must be locally accessible so this probably only makes sense on
the server.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
ip|IP Address to lookup.|string (required)
db|Path to the MaxMind GeoIP Database.|string (required)



<div class="vql_item"></div>


## import_collection
<span class='vql_type pull-right'>Function</span>

Imports an offline collection zip file (experimental).

Offline collectors are preconfigure Velociraptor binaries that
collect specific artifacts into a zip file.

This function allows such a collection to be imported into the GUI
as if it was collected by the server. The collection will be
loaded into a client's filestore directory.

Since there is no actual client id associated with the offline
collection (there is no Velociraptor client running on the
endpoint) we generate a random client ID for a new client.

If you specify an existing client id, the collection will be
uploaded into that client.

NOTE: Combine this function with the hunt_add() function to add a
manual offline collection to an ongoing hunt.




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
env|A dict of args to insert into the scope.|ordereddict.Dict



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


## reg_rm_key
<span class='vql_type pull-right'>Function</span>

Removes a key and all its values from the registry.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Registry key path.|string (required)



<div class="vql_item"></div>


## reg_rm_value
<span class='vql_type pull-right'>Function</span>

Removes a value in the registry.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Registry value path.|string (required)



<div class="vql_item"></div>


## reg_set_value
<span class='vql_type pull-right'>Function</span>

Set a value in the registry.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Registry value path.|string (required)
value|Value to set|LazyExpr (required)
type|Type to set (SZ, DWORD, QWORD)|string (required)
create|Set to create missing intermediate keys|bool



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


## rm
<span class='vql_type pull-right'>Function</span>

Remove a file from the filesystem using the API.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|Filename to remove.|string (required)



<div class="vql_item"></div>


## send_event
<span class='vql_type pull-right'>Function</span>

Sends an event to a server event monitoring queue.

This is used to send an event to a waiting server event monitoring
artifact (either as a VQL query running on the server or perhaps
an external program waiting for this event via the API.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifact|The artifact name to send the event to.|string (required)
row|The row to send to the artifact|ordereddict.Dict (required)



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


## starl
<span class='vql_type pull-right'>Function</span>

Compile a starlark code block - returns a module usable in VQL



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
code|The body of the starlark code.|string (required)
key|If set use this key to cache the Starlark code block.|string
globals|Dictionary of values to feed into Starlark environment|Any



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


## timeline
<span class='vql_type pull-right'>Plugin</span>

Read a timeline. You can create a timeline with the timeline_add() function



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
timeline|Name of the timeline to read|string (required)
skip|List of child components to skip|list of string
start|First timestamp to fetch|Any
notebook_id|The notebook ID the timeline is stored in.|string



<div class="vql_item"></div>


## timeline_add
<span class='vql_type pull-right'>Function</span>

Add a new query to a timeline.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
timeline|Supertimeline to add to|string (required)
name|Name of child timeline|string (required)
query|Run this query to generate the timeline.|StoredQuery (required)
key|The column representing the time.|string (required)
notebook_id|The notebook ID the timeline is stored in.|string



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


## upload_directory
<span class='vql_type pull-right'>Function</span>

Upload a file to an upload directory. The final filename will be the output directory path followed by the filename path.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|Filename to be stored within the output directory|string
accessor|The accessor to use|string
output|An output directory to store files in.|string (required)
mtime|Modified time to set the output file.|Any
atime|Access time to set the output file.|Any
ctime|Change time to set the output file.|Any
btime|Birth time to set the output file.|Any



<div class="vql_item"></div>


## user_create
<span class='vql_type pull-right'>Function</span>

Creates a new user from the server, or updates their permissions or reset their password.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
user||string (required)
roles||list of string (required)
password||string



<div class="vql_item"></div>


## user_delete
<span class='vql_type pull-right'>Function</span>

Deletes a user from the server.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
user||string (required)



<div class="vql_item"></div>


## whoami
<span class='vql_type pull-right'>Function</span>

Returns the username that is running the query.



<div class="vql_item"></div>


## xor
<span class='vql_type pull-right'>Function</span>

Apply xor to the string and key.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|String to apply Xor|string (required)
key|Xor key.|string (required)

