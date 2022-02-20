---
title: Basic VQL
weight: 10
linktitle: Basic VQL
index: true
---

VQL provides a basic set of functions and plugins allowing
queries to manipulate data and implement logic. This page details
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


## atoi
<span class='vql_type pull-right'>Function</span>

Convert a string to an integer.



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

Return the basename of the path. For example basename(path="/foo/bar") -> "bar"




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|Any (required)
sep|Separator to use (default /)|string
path_type|Type of path (e.g. 'windows,linux)|string



<div class="vql_item"></div>


## batch
<span class='vql_type pull-right'>Plugin</span>

Batches query rows into multiple arrays.

This is useful for batching multiple rows from a query into
another query (for example sending into an API endpoint). For
example:

```vql
SELECT * FROM batch(query={
  SELECT _value
  FROM range(start=0, end=10, step=1)
}, batch_size=3)
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
batch_size|Size of batch (defaults to 10).|int64
batch_func|A VQL Lambda that determines when a batch is ready. Example 'x=>len(list=x) >= 10'.|string
query|Run this query over the item.|StoredQuery (required)



<div class="vql_item"></div>


## cache
<span class='vql_type pull-right'>Function</span>

Creates a cache object.

A Cache is a data structure which is used to speed up calculating
data by keeping it's value in memory. A cache is essentially a key
value store - when the key is accessed, the function will be
calculated producing a value. If the key is accessed again, the
value is returned from the cache without calculating it again.

For example consider the following:

```vql
    LET get_pid_query(Lpid) =
       SELECT Pid, Ppid, Name FROM pslist(pid=Lpid)

    SELECT cache(func=get_pid_query(Lpid=Pid), key=str(str=Pid))
    FROM ....
```

The cache will ensure that get_pid_query() is only called once per
unique Pid by comparing the key against the internal memory store.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
func|A function to evaluate|LazyExpr (required)
name|The global name of this cache (needed when more than one)|string
key|Cache key to use.|string (required)
period|The latest age of the cache.|int64



<div class="vql_item"></div>


## column_filter
<span class='vql_type pull-right'>Plugin</span>

Select columns from another query using regex.

Sometimes a query produces a large number of columns or
unpredictable column names (eg. the `read_reg_key()` plugin
produces a column per value name).

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


## copy
<span class='vql_type pull-right'>Function</span>

Copy a file.

The source file can use any accessor - for example one can copy
the $MFT using the ntfs accessor to a regular file. Another
example is to extract a file from a zip file using the `zip`
accessor into a file on disk.

This function can also be used to create new files with prescribed
content - for example:

```vql
SELECT copy(filename="Hello world", accessor="data", dest="C:/hi.txt")
FROM scope()
```

NOTE: Sparse files are padded out




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|The file to copy from.|string (required)
accessor|The accessor to use|string
dest|The destination file to write.|string (required)
permissions|Required permissions (e.g. 'x').|string
append|If true we append to the target file otherwise truncate it|bool



<div class="vql_item"></div>


## count
<span class='vql_type pull-right'>Function</span>

Counts the items.

This function is an aggregation function that counts the number of
times it is evaluated per group by context. It is useful in a
GROUP BY clause to count the number of items in each group.

You can also use it in a regular query to produce a row
count. NOTE: When used in this way it only counts the total number
of rows that are actually evaluated (i.e. not filtered out) due to
the lazy evaluation property of VQL columns.

For a full discussion of aggregate functions see
https://docs.velociraptor.app/docs/vql/#aggregate-functions




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
items|Not used anymore|Any



<div class="vql_item"></div>


## dict
<span class='vql_type pull-right'>Function</span>

Construct a dict from arbitrary keyword args.

This function creates a dictionary (a key/value map). NOTE: In VQL
dictionaries always have string keys. Sometimes key names contain
special characters like dots etc, in that case you can use
backticks to escape the name. For example:

```vql
SELECT dict(Foo="Bar", `Name.With.Dots`="Baz")
FROM scope()
```

See the `to_dict()` function to create dicts from a query with
unpredictable key names.




<div class="vql_item"></div>


## dirname
<span class='vql_type pull-right'>Function</span>

Return the directory path.

For example direname(path="/usr/bin/ls") -> "/usr/bin"

Related: basename()




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|Any (required)
sep|Separator to use (default /)|string
path_type|Type of path (e.g. 'windows,linux)|string



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

This is an aggregate function that keeps track of all elements in
a GROUP BY group.

NOTE: Use this function carefully as memory use can be large. It
keeps a copy of every element in the group and that can be very
large for large result sets.




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

This function uses the Golang standard for expanding variables
(using $varname ). On Windows, we also support using the Windows
notation with % before and after the variable name.

```vql
SELECT expand(path="My Username is %USERNAME%")
FROM scope()
```

NOTE: The environment strings are set per user and Velociraptor's
own environment may not reflect any other process's
environment. See `Windows.Forensics.ProcessInfo` for a
forensically sound manner of obtaining the environment from any
process.




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

This function is essentially a wrapper around Golang's
fmt.Sprintf() function and uses the same format specifiers.

https://pkg.go.dev/fmt

Of note the following are very useful:

* The `% x` applied on strings will hex print the string
* The `%T` will reveal the internal type of an object.
* The `%v` is the general purpose stringifier and can apply to strings, ints etc.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
format|Format string to use|string (required)
args|An array of elements to apply into the format string.|Any



<div class="vql_item"></div>


## generate
<span class='vql_type pull-right'>Function</span>

Create a named generator that receives rows from the query.

This plugin allow multiple queries to efficiently filter rows from
the same query. For example:

```vql
LET SystemLog = generate(query={
   SELECT * FROM parse_evtx(filename='''C:\Windows\system32\winevt\logs\System.evtx''')
})

SELECT timestamp(epoch=System.TimeCreated.SystemTime) AS Timestamp,
   Type, EventData
FROM combine(
a={
  SELECT *, "Kernel Driver Install" AS Type
  FROM SystemLog
  WHERE System.EventID.Value = 7045 AND EventData.ServiceType =~ "kernel"
}, b={
  SELECT *, "Log File Cleared" AS Type,
            UserData.LogFileCleared AS EventData
  FROM SystemLog
  WHERE System.EventID.Value = 104
})
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name to call the generator|string
query|Run this query to generator rows.|StoredQuery
delay|Wait before starting the query|int64
with_file_buffer|Enable file buffering|bool



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

Using the member parameter you can index inside a nested
dictionary using dots to separate the layers.

If you need to access a field with dots in its name, you can use
the field parameter which simply fetches the named field.




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

Returns the current pid of the Velociraptor process.

This is typically used to exclude analysis from our own process.




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
given, then perform hash or upload to the server.




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

This can be used to filter dict items by feeding the results to
`to_dict()`




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any



<div class="vql_item"></div>


## items
<span class='vql_type pull-right'>Plugin</span>

Enumerate all members of the item (similar to Python's items() method).

This plugin allows iteration over dicts or queries.

### Iterating dicts

If the item is a dict, then this plugin will iterate over its keys
and values producing two columns:

* The `_key` column is the dictionary key
* The `_value` column is the dictionary value

### Iterating queries

For queries or arrays, the `items()` plugin will produce two columns:

* The `_key` column is the row index starting from 0
* The `_value` column is the row itself as a dict.

The `items()` query is useful to treat the results of another
query as a dict instead of a row. This is useful when the query
produces unpredictable columns or you need to operate over the
column names somehow.

For example:

```vql
SELECT * FROM items(item={ SELECT * FROM info() })
```

Produces:

```json
[
  {
    "_key": 0,
    "_value": {
      "Hostname": "DESKTOP-BTI2T9T",
      "Uptime": 20445,
      "BootTime": 1641029930,
      "Architecture": "amd64"
    }
  }
]
```




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
sep|The separator. Defaults to an empty string if not explicitly set|string



<div class="vql_item"></div>


## killkillkill
<span class='vql_type pull-right'>Function</span>

Kills the client and forces a restart - this is very aggressive!



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
dedup|Suppress same message in this many seconds (default 60 sec).|int64



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
item||LazyExpr (required)



<div class="vql_item"></div>


## memoize
<span class='vql_type pull-right'>Function</span>

Memoize a query into memory.

Memoizing a query means to cache the results of the query so they
can be accessed quickly.

Consider the following query:

```vql
LET ProcessDetails(ProcessPid) = SELECT Name, Pid, Ppid FROM pslist()
  WHERE Pid=ProcessPid
```

This query retrieves the process details for any Pid such as the
Name, Pid and parent Pid.

While this query works, imagine having to use it in a large query
to resolve many different processes. Each time the function is
called the pslist() plugin is run over all processes and the
correct process is selected - this can lead to thousands of
pslist() executions!

We can solve this by memoizing the results of the query -
i.e. storing them in memory and retrieving a single row based on a
key.

```vql
LET m <= memoize(query={
   SELECT str(str=Pid) AS Key, Name, Pid, Ppid FROM pslist()
}, key='Key')
```

The `memoize()` function looks like a `dict()` and when accessed
will automatically run the query once and cache its rows. The Key
column of the query is used as the key of the dict.

You can access the cache using the `get()` function or the `.`
operator. If the key matches the entire row is retrieved:

```vql
SELECT get(item=m, field=str(str=Pid)).Name AS ProcessName
FROM source()
```




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
item||LazyExpr (required)



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
components|Path components to join.|list of Any (required)
sep|Separator to use (default /)|string
path_type|Type of path (e.g. 'windows)|string



<div class="vql_item"></div>


## path_split
<span class='vql_type pull-right'>Function</span>

Split a path into components. Note this is more complex than just split() because it takes into account path escaping.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Path to split into components.|Any (required)
path_type|Type of path (e.g. 'windpws)|string



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


## regex_transform
<span class='vql_type pull-right'>Function</span>

Search and replace a string with multiple regex. Note you can use $1
to replace the capture string.

```vql
SELECT regex_transform(source="Hello world", map=dict(
   `^Hello`="Goodbye",
   `world`="Space"), key="A")
FROM scope()
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
source|The source string to replace.|string (required)
map|A dict with keys reg, values substitutions.|ordereddict.Dict (required)
key|A key for caching|string



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
format|Encoding format (csv,json,yaml,hex,base64)|string



<div class="vql_item"></div>


## set
<span class='vql_type pull-right'>Function</span>

Sets the member field of the item. If item is omitted sets the scope.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any (required)
field||string (required)
value||Any (required)



<div class="vql_item"></div>


## sleep
<span class='vql_type pull-right'>Function</span>

Sleep for the specified number of seconds. Always returns true.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
time|The number of seconds to sleep|int64
ms|The number of ms to sleep|int64



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


## split
<span class='vql_type pull-right'>Function</span>

Splits a string into an array based on a regexp separator.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|The value to split|string (required)
sep|The separator that will be used to split|string
sep_string|The separator as string that will be used to split|string



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

This is one of the most important functions in VQL. We need to
convert timestamps very frequently from various
representations. Most commonly from strings, Unix epoch times etc.

This function is pretty smart and tries to do the right thing most
of the time automatically. For example, you can provide the epoch
parameter as an integer representing seconds since the epoch,
milliseconds or microseconds since the epoch.

```vql
SELECT timestamp(epoch=1630414425) AS Time1,
       timestamp(epoch=1630414425000) AS Time2,
       timestamp(epoch=1630414425000000) AS Time3,
FROM scope()
```

You can also provide a string, and `timestamp()` will try to parse
it by guessing what it represents. For example

```
SELECT timestamp(string='March 3 2019'),
       timestamp(string='07/25/2019 5pm')
FROM scope()
```

For more control over the parsing of strings, use the `format`
parameter to specify a template which will be used to parse the
timestamp.

The format template uses a constant time as an example of how the
time is layed out. It represents a template for a timestamp that
**must** use the following date constants

* Year: "2006" "06"
* Month: "Jan" "January"
* Textual day of the week: "Mon" "Monday"
* Numeric day of the month: "2" "_2" "02"
* Numeric day of the year: "__2" "002"
* Hour: "15" "3" "03" (PM or AM)
* Minute: "4" "04"
* Second: "5" "05"
* AM/PM mark: "PM"
* "-0700"  ±hhmm
* "-07:00" ±hh:mm
* "-07"    ±hh

```vql
SELECT timestamp(string="8/30/2021 6:01:28 PM",
                 format="1/2/2006 3:04:05 PM")
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
epoch||Any
cocoatime||int64
mactime|HFS+|int64
winfiletime||int64
string|Guess a timestamp from a string|string
timezone|A default timezone (UTC)|string
format|A format specifier as per the Golang time.Parse|string



<div class="vql_item"></div>


## to_dict
<span class='vql_type pull-right'>Function</span>

Construct a dict from a query.

Sometimes we need to build a dict object where both the names of
the keys and their values are not known in advance - they are
calculated from another query. In this case we can use the
to_dict() function to build a dict from a query. The query needs
to emits as many rows as needed with a column called `_key` and
one called `_value`. The `to_dict()` will then construct a dict
from this query.

### Notes

1. In VQL all dicts are ordered, so the order in which rows appear
in the query will determine the dict's key order.

2. VQL dicts always have string keys, if the `_key` value is not a
string the row will be ignored.

### Example

The following (rather silly) example creates a dict mapping Pid to
ProcessNames in order to cache Pid->Name lookups. We then resolve
Pid to Name within other queries. Note the use of <= to
materialize the dict into memory once.

```vql
LET PidLookup <= to_dict(item={
    SELECT str(str=Pid) AS _key, Name AS _value
    FROM pslist()
})

SELECT Pid, get(item=PidLookup, field=str(str=Pid))
FROM pslist()
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item||Any



<div class="vql_item"></div>


## unhex
<span class='vql_type pull-right'>Function</span>

Apply hex decoding to the string.

A hex encoded string consists of two hex digits per byte -
therefore valid hex encoded strings have an even length.

For example: "01230F0a"

Note: If you need to encode a string as hex encoded string you can
use the format function:

```vql
format(format="%02x", args="Hello") -> "48656c6c6f"
```




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
name|The name of the file that should be stored on the server (may contain the path)|string
user|The username to connect to the endpoint with|string (required)
path|Path on server to upload file to (will be prepended to name)|string
accessor|The accessor to use|string
privatekey|The private key to use|string (required)
endpoint|The Endpoint to use including port number (e.g. 192.168.1.1:22 )|string (required)
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
noverifycert|Skip TLS Verification|bool



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
