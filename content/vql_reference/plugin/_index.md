---
title: Client Side
weight: 50
linktitle: Client
index: true
---

This page lists the plugins used to collect information from
clients.

VQL plugins are the data sources of VQL queries. While SQL queries
refer to static tables of data, VQL queries refer to plugins, which
generate data rows to be filtered by the query.

Unlike SQL, VQL plugins also receive keyword arguments. When the
plugin is evaluated it simply generates a sequence of rows which are
further filtered by the query.

This allows VQL statements to be chained naturally since plugin args
may also be other queries.

{{% notice note %}}

VQL plugins are not the same as VQL functions. A plugin is the subject
of the VQL query - i.e. plugins always follow the `FROM` keyword,
while functions (which return a single value instead of a sequence of
rows) are only present in column specification (e.g. after `SELECT`)
or in condition clauses (i.e. after the `WHERE` keyword).

{{% /notice %}}


<div class="vql_item"></div>


## chain
<span class='vql_type pull-right'>Plugin</span>

Chain the output of several queries into the same table.

This plugin takes a number of queries and joins their output into
the same table.

You can provide the `async=TRUE` parameter to run the queries in
parallel. This is needed when queries are event queries that never
terminate. You can use this property to collect the output from
multiple event plugins into the same artifact output.

### Example

The following returns the rows from the first query then the rows from
the second query.

```sql
SELECT * FROM chain(
  a={ SELECT ...},
  b={ SELECT ...},
  async=TRUE)
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
async|If specified we run all queries asynchronously and combine the output.|bool



<div class="vql_item"></div>


## collect
<span class='vql_type pull-right'>Plugin</span>

Collect artifacts into a local file.

This plugin is essentially the same as the `velociraptor artifacts
collect --output file.zip` command. It will collect the artifacts
into a zip file.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
artifacts|A list of artifacts to collect.|list of string (required)
output|A path to write the output file on.|string
report|A path to write the report on.|string
args|Optional parameters.|Any
password|An optional password to encrypt the collection zip.|string
format|Output format (csv, jsonl).|string
artifact_definitions|Optional additional custom artifacts.|Any
template|The name of a template artifact (i.e. one which has report of type HTML).|string
level|Compression level between 0 (no compression) and 9.|int64



<div class="vql_item"></div>


## environ
<span class='vql_type pull-right'>Plugin</span>

The row returned will have all environment variables as
columns. If the var parameter is provided, only those variables
will be provided.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
vars|Extract these variables from the environment and return them one per row|list of string



<div class="vql_item"></div>


## execve
<span class='vql_type pull-right'>Plugin</span>

This plugin launches an external command and captures its STDERR,
STDOUT and return code. The command's stdout is split using the `sep`
parameter as required.

This plugin is mostly useful for running arbitrary code on the
client. If you do not want to allow arbitrary code to run, you can
disable this by setting the `prevent_execve` flag in the client's
config file. Be aware than many artifacts require running external
commands to collect their output though.

We do not actually transfer the external program to the system
automatically. If you need to run programs which are not usually
installed (e.g. Sysinternal's autoruns.exe) you will need to use
Velociraptor's external tools feature to deliver and manage the
tools on the client.

https://docs.velociraptor.app/docs/extending_vql/#using-external-tools




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
argv|Argv to run the command with.|list of string (required)
sep|The separator that will be used to split the stdout into rows.|string
length|Size of buffer to capture output per row.|int64



<div class="vql_item"></div>


## filesystems
<span class='vql_type pull-right'>Plugin</span>

Enumerates mounted filesystems.




<div class="vql_item"></div>


## flatten
<span class='vql_type pull-right'>Plugin</span>

Flatten the columns in query. If any column repeats then we repeat the entire row once for each item.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
Name||string



<div class="vql_item"></div>


## for
<span class='vql_type pull-right'>Plugin</span>

Iterate over a list.

DEPRECATED - use foreach() instead.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
var|The variable to assign.|string (required)
foreach|The variable to iterate over.|StoredQuery (required)
query|Run this query over the item.|StoredQuery



<div class="vql_item"></div>


## foreach
<span class='vql_type pull-right'>Plugin</span>

Executes 'query' once for each row in the 'row' query.

The columns in row will be stored in the scope that is used to
evaluate the query therefore the query may refer to the results
from the `row` query.

Foreach in VQL is essentially the same as an SQL JOIN operator but
much simpler to use.

If the `workers` parameter is specified, the plugin will spawn
this many workers and evaluate the `query` query in each worker
concurrently if possible. It is safe to use a large number here
(say 100) to utilize all available cores.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
row|A query or slice which generates rows.|LazyExpr (required)
query|Run this query for each row.|StoredQuery
async|If set we run all queries asyncronously (implies workers=1000).|bool
workers|Total number of asyncronous workers.|int64
column|If set we only extract the column from row.|string



<div class="vql_item"></div>


## glob
<span class='vql_type pull-right'>Plugin</span>

Retrieve files based on a list of glob expressions

The `glob()` plugin is one of the most used plugins. It applies a glob
expression in order to search for files by file name. The glob
expression allows for wildcards, alternatives and character
classes. Globs support both forward and backslashes as path
separators. They also support quoting to delimit components.

A glob expression consists of a sequence of components separated by
path separators. If a separator is included within a component it is
possible to quote the component to keep it together. For example, the
windows registry contains keys with forward slash in their
names. Therefore we may use these to prevent the glob from getting
confused:

```
HKEY_LOCAL_MACHINE\Microsoft\Windows\"Some Key With http://www.microsoft.com/"\Some Value
```

Glob expressions are case insensitive and may contain the following wild cards:

* The `*` matches one or more characters.
* The `?` matches a single character.
* Alternatives are denoted by braces and comma delimited: `{a,b}`
* Recursive search is denoted by a `**`. By default this searches 3 directories deep. If you need to increase it you can add a depth number (e.g. `**10`)

By default globs do not expand environment variables. If you need to
expand environment variables use the `expand()` function explicitly:

```sql
glob(globs=expand(string="%SystemRoot%\System32\Winevt\Logs\*"))
```

### Example

The following searches the raw NTFS disk for event logs.

```sql
SELECT FullPath FROM glob(
globs="C:\Windows\System32\Winevt\Logs\*.evtx",
accessor="ntfs")
```

### The root parameter

If the root parameter is specified, we start globbing from this
directory - i.e. the glob pattern is appended to the root
parameter.  The `root` parameter is useful if the directory name
itself may contain glob characters.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
globs|One or more glob patterns to apply to the filesystem.|list of string (required)
root|The root directory to glob from (default '').|string
accessor|An accessor to use.|string
nosymlink|If set we do not follow symlinks.|bool



<div class="vql_item"></div>


## grep
<span class='vql_type pull-right'>Function</span>

Search a file for keywords.

DEPRECATED: Use `yara()` instead.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|path to open.|string (required)
accessor|An accessor to use.|string
keywords|Keywords to search for.|list of string (required)
context|Extract this many bytes as context around hits.|int



<div class="vql_item"></div>


## hash
<span class='vql_type pull-right'>Function</span>

Calculate the hash of a file.

This function calculates the MD5, SHA1 and SHA256 hashes of the file.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
path|Path to open and hash.|string (required)
accessor|The accessor to use|string



<div class="vql_item"></div>


## http_client
<span class='vql_type pull-right'>Plugin</span>

Make a http request.

This plugin makes a HTTP connection using the specified method. The
headers and parameters may be specified. The plugin reads the
specified number of bytes per returned row.

If `disable_ssl_security` is specified we do not enforce SSL
integrity. This is required to connect to self signed ssl web
sites. For example many API handlers are exposed over such
connections.

{{% notice note %}}

When connecting to the Velociraptor frontend itself, even in self
signed mode, we will ensure certs are properly verified. You can
therefore safely export files from the Frontend's public directory
over self signed SSL. When connecting to a self signed Velociraptor
frontend, we ensure the self signed certificate was issued by the
Velociraptor internal CA - i.e. we pin the Frontend's certificate in
the binary.

{{% /notice %}}

The `http_client()` plugin allows use to interact with any web
services. If the web service returns a json blob, we can parse it
with the `parse_json()` function (or `parse_xml()` for SOAP
endpoints). Using the parameters with a POST method we may
actually invoke actions from within VQL (e.g. send an SMS via an
SMS gateway when a VQL event is received). So this is a very
powerful plugin - see examples below.

When the `tempfile_extension` parameter is provided, the HTTP
response body will be written to a tempfile with that
extension. The name of this tempfile will be emitted as the
`Content` column.

This plugin will emit rows with the following columns:
* Url      string: The url we fetched.
* Content  string: The body content for this chunk
* Response int: The HTTP response code (200=success)

### Example

The following VQL returns the client's external IP as seen by the
externalip service.

```sql
SELECT Content as IP from http_client(url='http://www.myexternalip.com/raw')
```

You can use this plugin to download file contents by passing the
`tempfile_extension` parameter. In this case this plugin will
create a new temp file with the specified extension, write the
content of the HTTP request into it and then emit a row with
`Content` being the name of the file. The file will be
automatically removed when the query ends.

### Example: Uploading files

Many API handlers support uploading files via POST messages. While
this is not directly supported by http_client it is possible to
upload a file using simple VQL - by formatting the POST body using
the multipart rules.

```vql
LET file_bytes = read_file(filename="/bin/ls")

SELECT *
FROM http_client(
    url='http://localhost:8002/test/',
    method='POST',
    headers=dict(
        `Content-Type`="multipart/form-data;boundary=83fcda3640aca670"
    ),
    data='--83fcda3640aca670\r\nContent-Disposition: form-data; name="file";filename="ls"\r\nContent-Type: application/octet-stream\r\n\r\n' +
         file_bytes + '\r\n--83fcda3640aca670--')
```

Note how custom headers can be provided using a dict - note also
how dict keys with special characters in them can be constructed
using the backtick quoting.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
url|The URL to fetch|string (required)
params|Parameters to encode as POST or GET query strings|Any
headers|A dict of headers to send.|Any
method|HTTP method to use (GET, POST)|string
data|If specified we write this raw data into a POST request instead of encoding the params above.|string
chunk_size|Read input with this chunk size and send each chunk as a row|int
disable_ssl_security|Disable ssl certificate verifications.|bool
tempfile_extension|If specified we write to a tempfile. The content field will contain the full path to the tempfile.|string
remove_last|If set we delay removal as much as possible.|bool



<div class="vql_item"></div>


## if
<span class='vql_type pull-right'>Plugin</span>

Conditional execution of query

This function evaluates a condition. Note that the values used in the
`then` or `else` clause are evaluated lazily. They may be expressions
that involve stored queries (i.e. queries stored using the `LET`
keyword). These queries will not be evaluated if they are not needed.

This allows a query to cheaply branch. For example, if a parameter is
given, then perform hash or upload to the server. See the
`Windows.Search.FileFinder` for an example of how `if()` is used.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
condition||Any (required)
then||StoredQuery (required)
else||StoredQuery



<div class="vql_item"></div>


## info
<span class='vql_type pull-right'>Plugin</span>

Get information about the running host.

This plugin returns a single row with information about the current
system. The information includes the Hostname, Uptime, OS, Platform
etc.

This plugin is very useful in preconditions as it restricts a query to
certain OS or versions.




<div class="vql_item"></div>


## int
<span class='vql_type pull-right'>Function</span>

Truncate to an integer.

If provided a string, the function will try to parse it into an integer.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
int|The integer to round|Any



<div class="vql_item"></div>


## ip
<span class='vql_type pull-right'>Function</span>

Format an IP address.

Converts an ip address encoded in various ways. If the IP address is
encoded as 32 bit integer we can use netaddr4_le or netaddr4_be to
print it in a human readable way.

This currently does not support IPv6 addresses. Those are usually
encoded as an array of 8 bytes which makes it easy to format using the
`format()` function:

```
  format(format="%x:%x:%x:%x:%x:%x:%x:%x", value)
```




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
netaddr4_le|A network order IPv4 address (as little endian).|int64
netaddr4_be|A network order IPv4 address (as big endian).|int64



<div class="vql_item"></div>


## js_get
<span class='vql_type pull-right'>Function</span>

Get a variable's value from the JS VM.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
var|The variable to get from the JS VM.|string (required)
key|If set use this key to cache the JS VM.|string



<div class="vql_item"></div>


## js_set
<span class='vql_type pull-right'>Function</span>

Set a variables value in the JS VM.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
var|The variable to set inside the JS VM.|string (required)
value|The value to set inside the VM.|Any (required)
key|If set use this key to cache the JS VM.|string



<div class="vql_item"></div>


## profile
<span class='vql_type pull-right'>Plugin</span>

Returns a profile dump from the running process.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
allocs|A sampling of all past memory allocations|bool
block|Stack traces that led to blocking on synchronization primitives|bool
goroutine|Stack traces of all current goroutines|bool
heap|A sampling of memory allocations of live objects.|bool
mutex|Stack traces of holders of contended mutexes|bool
profile|CPU profile.|bool
trace|CPU trace.|bool
debug|Debug level|int64
logs|Recent logs|bool
queries|Recent Queries run|bool
metrics|Collect metrics|bool
duration|Duration of samples (default 30 sec)|int64



<div class="vql_item"></div>


## pslist
<span class='vql_type pull-right'>Plugin</span>

Enumerate running processes.

When specifying the pid this operation is much faster so if you are
interested in specific processes, the pid should be
specified. Otherwise, the plugin returns all processes one on each
row.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
pid|A pid to list. If this is provided we are able to operate much faster by only opening a single process.|int64



<div class="vql_item"></div>


## read_file
<span class='vql_type pull-right'>Plugin</span>

Read files in chunks.

This plugin reads a file in chunks and returns each chunks as a separate row.

It is useful when we want to report file contents for small files like
configuration files etc.

The returned row contains the following columns: data, offset, filename




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
chunk|length of each chunk to read from the file.|int
max_length|Max length of the file to read.|int
filenames|One or more files to open.|list of string (required)
accessor|An accessor to use.|string



<div class="vql_item"></div>


## scope
<span class='vql_type pull-right'>Plugin</span>

The scope plugin returns the current scope as a single row.

The main use for this plugin is as a NOOP plugin in those cases we
dont want to actually run anything.

### Example

```sql
SELECT 1+1 As Two FROM scop()
```




<div class="vql_item"></div>


## stat
<span class='vql_type pull-right'>Plugin</span>

Get file information. Unlike glob() this does not support wildcards.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|One or more files to open.|list of string (required)
accessor|An accessor to use.|string



<div class="vql_item"></div>


## switch
<span class='vql_type pull-right'>Plugin</span>

Executes each query. The first query to return any rows will be emitted.



<div class="vql_item"></div>


## tempfile
<span class='vql_type pull-right'>Function</span>

Create a temporary file and write some data into it.

The file will be automatically removed when the query completes.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|Data to write in the tempfile.|list of string
extension|An extension to place in the tempfile.|string
permissions|Required permissions (e.g. 'x').|string
remove_last|If set we delay removal as much as possible.|bool



<div class="vql_item"></div>


## upload
<span class='vql_type pull-right'>Function</span>

Upload a file to the upload service. For a Velociraptor client this
will upload the file into the flow and store it in the server's file store.

If Velociraptor is run locally the file will be copied to the
`--dump_dir` path or added to the triage evidence container.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
mtime|Modified time to record|Any
atime|Access time to record|Any
ctime|Change time to record|Any
btime|Birth time to record|Any



<div class="vql_item"></div>


## upload
<span class='vql_type pull-right'>Plugin</span>

Upload files to the server.

This plugin uploads the specified file to the server. If Velociraptor
is run locally the file will be copied to the `--dump_dir` path or
added to the triage evidence container.

This functionality is also available using the upload() function which
might be somewhat easier to use.




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
files|A list of files to upload|list of string (required)
accessor|The accessor to use|string
mtime|Modified time to record|Any



<div class="vql_item"></div>


## upload_gcs
<span class='vql_type pull-right'>Function</span>

Upload files to GCS.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
project|The project to upload to|string (required)
credentials|The credentials to use|string (required)



<div class="vql_item"></div>


## upload_s3
<span class='vql_type pull-right'>Function</span>

Upload files to S3.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
region|The region the bucket is in|string (required)
credentialskey|The AWS key credentials to use|string
credentialssecret|The AWS secret credentials to use|string
endpoint|The Endpoint to use|string
serversideencryption|The server side encryption method to use|string
noverifycert|Skip TLS Verification|bool



<div class="vql_item"></div>


## write_csv
<span class='vql_type pull-right'>Plugin</span>

Write a query into a CSV file.



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|string (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)



<div class="vql_item"></div>


## yara
<span class='vql_type pull-right'>Plugin</span>

Scan files using yara rules.

The `yara()` plugin applies a signature consisting of multiple rules
across files. You can read more about [yara rules](https://yara.readthedocs.io/en/v3.4.0/writingrules.html). The
accessor is used to open the various files which allows this plugin to
work across raw ntfs, zip members or indeed process memory.

Scanning proceeds by reading a block from the file, then applying the
yara rule on the block. This will fail if the signature is split
across block boundary. You can choose the block size to be
appropriate.

If the accessor is **not** specified we use the yara library to
directly open the file itself without Velociraptor's accessor
API. This allows Yara to mmap the file which has a number of
benefits including:

  1. The ability to scan without reading in blocks - so a
     signature matching the file header as well as a string deep
     within the file works.

  2. Various Yara extensions like the `pe` extension work allowing
     rules that use such extensions to work properly.

If we are not able to open the file (for example due to sharing
violations), Velociraptor will automatically fall back to the ntfs
accessor (on Windows) and will automatically switch to block by
block scanning.

Typically the yara rule does not change for the life of the query,
so Velociraptor caches it to avoid having to recompile it each
time. The `key` variable can be used to uniquely identify the
cache key for the rule. If the `key` variable is not specified, we
use the rule text itself to generate the cache key. It is
recommended that the `key` parameter be specified because it makes
it more efficient since we do not need to hash the rules each time.

### Shorthand rules

This plugin accepts yara rules in the `rules` parameter. But typically
we only search for keywords so writing a full yara syntax rule is
tedious. Therefore we provide a shorthand way to specify the
keywords. For example:

```
wide nocase:foo,bar,baz
```

When the rule is provided in the above form, the plugin will
automatically generate a yara rule which matches any of the specified
keywords. The specification before the `:` means the same thing as the
yara DSL and the following combinations are supported `wide`, `wide
ascii`, `wide nocase`, `wide nocase ascii`.


{{% notice note %}}

By default only the first 100mb of the file are scanned and
scanning stops after one hit is found.

{{% /notice %}}




<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
rules|Yara rules in the yara DSL.|string (required)
files|The list of files to scan.|list of string (required)
accessor|Accessor (e.g. NTFS)|string
context|How many bytes to include around each hit|int
start|The start offset to scan|uint64
end|End scanning at this offset (100mb)|uint64
number|Stop after this many hits (1).|int64
blocksize|Blocksize for scanning (1mb).|uint64
key|If set use this key to cache the  yara rules.|string

