---
title: Basic VQL
weight: 10
linktitle: Basic VQL
index: true
---

VQL provides a basic set of functions and plugins allowing
queries to maniulate data and implement logic. This page details
those plugins which are considered foundational to the VQL
language and therefore may be useful in all types of artifacts.

{{% notice note %}}
VQL plugins are not the same as VQL functions. A plugin is the subject
of the VQL query - i.e. plugins always follow the `FROM` keyword,
while functions (which return a single value instead of a sequence of
rows) are only present in column specification (e.g. after `SELECT`)
or in condition clauses (i.e. after the `WHERE` keyword).
{{% /notice %}}


<div class="vql_item"></div>


## array
<span class='vql_type pull-right'>Function</span>

Create an array with all the args.

This function accepts arbitrary arguments and creates an array by
flattening the arguments. For example `array(a=1, b=2)` will return
`[1, 2]`.

You can use this to flatten a subquery as well:

```sql
SELECT array(a1={ SELECT User FROM Artifact.Windows.System.Users() }) as Users FROM scope()
```

Will return a single row with Users being an array of names.




<div class="vql_item"></div>


## atoi
<span class='vql_type pull-right'>Function</span>

Convert a string to an int.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to convert to int|Any (required)



<div class="vql_item"></div>


## base64decode
<span class='vql_type pull-right'>Function</span>

Decodes a base64 encoded string.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)



<div class="vql_item"></div>


## base64encode
<span class='vql_type pull-right'>Function</span>

Encodes a string into base64.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)



<div class="vql_item"></div>


## basename
<span class='vql_type pull-right'>Function</span>

Return the basename of the path.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|string (required)
sep|Separator to use (default /)|string



<div class="vql_item"></div>


## cache
<span class='vql_type pull-right'>Function</span>

Creates a cache object



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
func|A function to evaluate|LazyExpr (required)
name|The global name of this cache (needed when more than one)|string
key|Cache key to use.|string (required)
period|The latest age of the cache.|int64



<div class="vql_item"></div>


## copy
<span class='vql_type pull-right'>Function</span>

Copy a file.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|The file to copy from.|string (required)
accessor|The accessor to use|string
dest|The destination file to write.|string (required)
permissions|Required permissions (e.g. 'x').|string



<div class="vql_item"></div>


## count
<span class='vql_type pull-right'>Function</span>

Counts the items.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
items|Not used anymore|Any



<div class="vql_item"></div>


## dict
<span class='vql_type pull-right'>Function</span>

Construct a dict from arbitrary keyword args.



<div class="vql_item"></div>


## dirname
<span class='vql_type pull-right'>Function</span>

Return the directory path.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|string (required)
sep|Separator to use (default /)|string



<div class="vql_item"></div>


## encode
<span class='vql_type pull-right'>Function</span>

Encodes a string as as different type. Currently supported types include 'hex', 'base64'.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string||Any (required)
type||string (required)



<div class="vql_item"></div>


## enumerate
<span class='vql_type pull-right'>Function</span>

Collect all the items in each group by bin.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
items|Not used anymore|Any



<div class="vql_item"></div>


## environ
<span class='vql_type pull-right'>Function</span>

Get an environment variable.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
var|Extract the var from the environment.|string (required)



<div class="vql_item"></div>


## expand
<span class='vql_type pull-right'>Function</span>

Expand the path using the environment.

This function expands environment variables into the path. It is
normally needed after using registry values of type REG_EXPAND_SZ as
they typically contain environment strings. Velociraptor does not
automatically expand such values since environment variables typically
depend on the specific user account which reads the registry value
(different user accounts can have different environment variables).




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|A path with environment escapes|string (required)



<div class="vql_item"></div>


## filter
<span class='vql_type pull-right'>Function</span>

Filters a strings array by regex.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
list|A list of items to filter|list of string (required)
regex|A regex to test each item|list of string (required)



<div class="vql_item"></div>


## format
<span class='vql_type pull-right'>Function</span>

Format one or more items according to a format string.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
format|Format string to use|string (required)
args|An array of elements to apply into the format string.|Any



<div class="vql_item"></div>


## get
<span class='vql_type pull-right'>Function</span>

Gets the member field from item.

This is useful to index an item from an array. For example:

### Example

```sql
select get(item=[dict(foo=3), 2, 3, 4], member='0.foo') AS Foo from scope()

[
 {
   "Foo": 3
 }
]
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any
member||string
field||Any
default||Any



<div class="vql_item"></div>


## getpid
<span class='vql_type pull-right'>Function</span>

Returns the current pid of the process.



<div class="vql_item"></div>


## humanize
<span class='vql_type pull-right'>Function</span>

Format items in human readable way.

Formats a byte count in human readable way (e.g. Mb, Gb etc).




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
bytes|Format bytes with units|int64



<div class="vql_item"></div>


## if
<span class='vql_type pull-right'>Function</span>

Conditional execution of query

This function evaluates a condition. Note that the values used in the
`then` or `else` clause are evaluated lazily. They may be expressions
that involve stored queries (i.e. queries stored using the `LET`
keyword). These queries will not be evaluated if they are not needed.

This allows a query to cheaply branch. For example, if a parameter is
given, then perform hash or upload to the server. See the




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
condition||Any (required)
then||LazyExpr
else||LazyExpr



<div class="vql_item"></div>


## items
<span class='vql_type pull-right'>Function</span>

Iterate over dict members producing _key and _value columns



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any



<div class="vql_item"></div>


## items
<span class='vql_type pull-right'>Plugin</span>

Enumerate all members of the item (similar to Pythons items() method.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item|The item to enumerate.|Any



<div class="vql_item"></div>


## join
<span class='vql_type pull-right'>Function</span>

Join all the args on a separator.

Joins the array into a string separated by the sep character.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
array|The array to join|list of string (required)
sep|The separator|string



<div class="vql_item"></div>


## killkillkill
<span class='vql_type pull-right'>Function</span>

Kills the client and forces a restart - this is very aggresive!



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)



<div class="vql_item"></div>


## len
<span class='vql_type pull-right'>Function</span>

Returns the length of an object.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
list|A list of items too filter|Any (required)



<div class="vql_item"></div>


## log
<span class='vql_type pull-right'>Function</span>

Log the message.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
message|Message to log.|string (required)



<div class="vql_item"></div>


## lowcase
<span class='vql_type pull-right'>Function</span>





<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to lower|string (required)



<div class="vql_item"></div>


## max
<span class='vql_type pull-right'>Function</span>

Finds the largest item in the aggregate.

It is only meaningful in a group by query.

### Example

The following query lists all the processes and shows the largest
bash pid of all bash processes.

```SQL
SELECT Name, max(items=Pid) as LargestPid from pslist() Where Name =~ 'bash' group by Name
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||int64 (required)



<div class="vql_item"></div>


## memoize
<span class='vql_type pull-right'>Function</span>

Memoize a query into memory.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|Query to expand into memory|LazyExpr (required)
key|The name of the column to use as a key.|string (required)
period|The latest age of the cache.|int64



<div class="vql_item"></div>


## min
<span class='vql_type pull-right'>Function</span>

Finds the smallest item in the aggregate.

It is only meaningful in a group by query.

### Example

The following query lists all the processes and shows the smallest
bash pid of all bash processes.

```SQL
SELECT Name, min(items=Pid) as SmallestPid from pslist() Where Name =~ 'bash' group by Name
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||int64 (required)



<div class="vql_item"></div>


## now
<span class='vql_type pull-right'>Function</span>

Returns current time in seconds since epoch.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to convert to int|Any (required)



<div class="vql_item"></div>


## path_join
<span class='vql_type pull-right'>Function</span>

Build a path by joining all components.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
components|Path components to join.|list of string (required)
sep|Separator to use (default /)|string



<div class="vql_item"></div>


## path_split
<span class='vql_type pull-right'>Function</span>

Split a path into components. Note this is more complex than just split() because it takes into account path escaping.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Path to split into components.|string (required)



<div class="vql_item"></div>


## query
<span class='vql_type pull-right'>Function</span>

Launch a subquery and materialize it into a list of rows.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
vql||StoredQuery (required)



<div class="vql_item"></div>


## rand
<span class='vql_type pull-right'>Function</span>

Selects a random number.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
range|Selects a random number up to this range.|int64



<div class="vql_item"></div>


## read_file
<span class='vql_type pull-right'>Function</span>

Read a file into a string.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
length|Max length of the file to read.|int
offset|Where to read from the file.|int64
filename|One or more files to open.|string (required)
accessor|An accessor to use.|string



<div class="vql_item"></div>


## scope
<span class='vql_type pull-right'>Function</span>

return the scope.



<div class="vql_item"></div>


## serialize
<span class='vql_type pull-right'>Function</span>

Encode an object as a string (csv or json).



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item|The item to encode|Any (required)
format|Encoding format (csv,json)|string



<div class="vql_item"></div>


## sleep
<span class='vql_type pull-right'>Function</span>

Sleep for the specified number of seconds. Always returns true.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
time|The number of seconds to sleep|int64



<div class="vql_item"></div>


## split
<span class='vql_type pull-right'>Function</span>

Splits a string into an array based on a regexp separator.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|The value to split|string (required)
sep|The serparator that will be used to split|string (required)



<div class="vql_item"></div>


## str
<span class='vql_type pull-right'>Function</span>

Normalize a String.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
str|The string to normalize|Any (required)



<div class="vql_item"></div>


## strip
<span class='vql_type pull-right'>Function</span>

Strip a prefix from a string.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|The string to strip|string (required)
prefix|The prefix to strip|string



<div class="vql_item"></div>


## tempdir
<span class='vql_type pull-right'>Function</span>

Create a temporary directory. The directory will be removed when the query ends.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
remove_last|If set we delay removal as much as possible.|bool



<div class="vql_item"></div>


## timestamp
<span class='vql_type pull-right'>Function</span>

Convert from different types to a time.Time.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
epoch||Any
cocoatime||int64
mactime|HFS+|int64
winfiletime||int64
string|Guess a timestamp from a string|string
us_style|US Style Month/Day/Year|bool



<div class="vql_item"></div>


## to_dict
<span class='vql_type pull-right'>Function</span>

Construct a dict from another object.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any



<div class="vql_item"></div>


## upcase
<span class='vql_type pull-right'>Function</span>





<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to lower|string (required)



<div class="vql_item"></div>


## upload_sftp
<span class='vql_type pull-right'>Function</span>

Upload files to SFTP.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name of the file that should be stored on the server|string
user|The username to connect to the endpoint with|string (required)
path|Path on server to upload file to|string (required)
accessor|The accessor to use|string
privatekey|The private key to use|string (required)
endpoint|The Endpoint to use|string (required)
hostkey|Host key to verify. Blank to disable|string



<div class="vql_item"></div>


## upload_webdav
<span class='vql_type pull-right'>Function</span>

Upload files to a WebDAV server.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name that the file should have on the server|string
accessor|The accessor to use|string
url|The WebDAV url|string (required)
basic_auth_user|The username to use in HTTP basic auth|string
basic_auth_password|The password to use in HTTP basic auth|string



<div class="vql_item"></div>


## url
<span class='vql_type pull-right'>Function</span>

Construct a URL or parse one.

This function parses or constructs URLs. A URL may be constructed from
scratch by providing all the components or it may be parsed from an
existing URL.

The returned object is a [golang
URL](https://golang.org/pkg/net/url/#URL) and can be serialized again
using its `String` method.

This function is important when constructing parameters for certain
accessors which receive a URL. For example the `zip` accessor requires
its file names to consist of URLs. The Zip accessor interprets the URL
in the following way:

- The scheme is the delegate accessor to use.
- The path is the delegate accessor's filename
- The fragment is used by the zip accessor to retrieve the zip member itself.

In this case it is critical to properly escape each level - it is not
possible in the general case to simply append strings. You need to use
the `url()` function to build the proper url.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
scheme|The scheme to use|string
host|The host component|string
path|The path component|string
fragment|The fragment|string
parse|A url to parse|string



<div class="vql_item"></div>


## utf16
<span class='vql_type pull-right'>Function</span>

Parse input from utf16.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)



<div class="vql_item"></div>


## utf16_encode
<span class='vql_type pull-right'>Function</span>

Encode a string to utf16 bytes.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)



<div class="vql_item"></div>


## uuid
<span class='vql_type pull-right'>Function</span>

Generate a UUID.



<div class="vql_item"></div>


## version
<span class='vql_type pull-right'>Function</span>


Gets the version of a VQL plugin or function.

This is useful when writing portable VQL which can work with
older versions of Velociraptor. When Velociraptor plugins evolve
in an incompatible way their version is incremented. It is
possible to cater for multiple versions in the VQL using an if()
plugin.

For example the following can chose from a legacy query or a
modern query based on the plugin version:
```
 SELECT * FROM if(
  condition=version(plugin="glob") >= 1,
  then=NewQuery,
  else=LegacyQuery)
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
function||string
plugin||string

