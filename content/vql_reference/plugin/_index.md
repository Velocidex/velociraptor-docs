---
title: Client Side Functionality
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

## chain
<span class='vql_type pull-right'>Plugin</span>

Chain the output of several queries into the same table. This plugin
takes any args and chains them.

### Example

The following returns the rows from the first query then the rows from
the second query.

```sql
SELECT * FROM chain(
a={ SELECT ...},
b={ SELECT ...})
```



## collect
<span class='vql_type pull-right'>Plugin</span>

Collect artifacts into a local file.

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


## environ
<span class='vql_type pull-right'>Plugin</span>

The row returned will have all environment variables as
columns. If the var parameter is provided, only those variables
will be provided.


Arg | Description | Type
----|-------------|-----
vars|Extract these variables from the environment and return them one per row|list of string


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
installed (e.g. Sysinternal's autoruns.exe) you will need to map them
from a share (requiring direct access to the AD domain) or download
them using the `http_client()` plugin.


Arg | Description | Type
----|-------------|-----
argv|Argv to run the command with.|list of string (required)
sep|The serparator that will be used to split the stdout into rows.|string
length|Size of buffer to capture output per row.|int64


## filesystems
<span class='vql_type pull-right'>Plugin</span>




## flatten
<span class='vql_type pull-right'>Plugin</span>

Flatten the columns in query. If any column repeats then we repeat the entire row once for each item.

Arg | Description | Type
----|-------------|-----
Name||string


## for
<span class='vql_type pull-right'>Plugin</span>

Iterate over a list.

Arg | Description | Type
----|-------------|-----
var|The variable to assign.|string (required)
foreach|The variable to iterate over.|StoredQuery (required)
query|Run this query over the item.|StoredQuery


## foreach
<span class='vql_type pull-right'>Plugin</span>

Executes 'query' once for each row in the 'row' query.

Arg | Description | Type
----|-------------|-----
row|A query or slice which generates rows.|LazyExpr (required)
query|Run this query for each row.|StoredQuery
async|If set we run all queries asyncronously (implies workers=1000).|bool
workers|Total number of asyncronous workers.|int64
column|If set we only extract the column from row.|string


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


Arg | Description | Type
----|-------------|-----
globs|One or more glob patterns to apply to the filesystem.|list of string (required)
root|The root directory to glob from (default '').|string
accessor|An accessor to use.|string
nosymlink|If set we do not follow symlinks.|bool


## grep
<span class='vql_type pull-right'>Function</span>

Search a file for keywords.

Arg | Description | Type
----|-------------|-----
path|path to open.|string (required)
accessor|An accessor to use.|string
keywords|Keywords to search for.|list of string (required)
context|Extract this many bytes as context around hits.|int


## hash
<span class='vql_type pull-right'>Function</span>

Calculate the hash of a file.

This function calculates the MD5, SHA1 and SHA256 hashes of the file.


Arg | Description | Type
----|-------------|-----
path|Path to open and hash.|string (required)
accessor|The accessor to use|string


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
services. If the web service returns a json blob, we can parse it with
the `parse_json()` function (or `parse_xml()` for SOAP
endpoints). Using the parameters with a POST method we may actually
invoke actions from within VQL (e.g. send an SMS via an SMS gateway
when a VQL event is received).So this is a very powerful plugin.

When the `tempfile_extension` parameter is provided, the HTTP
request body will be written to a tempfile with that
extension. The name of this tempfile will be emitted as the
Content column.

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


Arg | Description | Type
----|-------------|-----
condition||Any (required)
then||StoredQuery (required)
else||StoredQuery


## info
<span class='vql_type pull-right'>Plugin</span>

Get information about the running host.

This plugin returns a single row with information about the current
system. The information includes the Hostname, Uptime, OS, Platform
etc.

This plugin is very useful in preconditions as it restricts a query to
certain OS or versions.



## int
<span class='vql_type pull-right'>Function</span>

Truncate to an integer.

Arg | Description | Type
----|-------------|-----
int|The integer to round|Any


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


Arg | Description | Type
----|-------------|-----
netaddr4_le|A network order IPv4 address (as little endian).|int64
netaddr4_be|A network order IPv4 address (as big endian).|int64


## js_get
<span class='vql_type pull-right'>Function</span>

Get a variable's value from the JS VM.

Arg | Description | Type
----|-------------|-----
var|The variable to get from the JS VM.|string (required)
key|If set use this key to cache the JS VM.|string


## js_set
<span class='vql_type pull-right'>Function</span>

Set a variables value in the JS VM.

Arg | Description | Type
----|-------------|-----
var|The variable to set inside the JS VM.|string (required)
value|The value to set inside the VM.|Any (required)
key|If set use this key to cache the JS VM.|string


## pslist
<span class='vql_type pull-right'>Plugin</span>

Enumerate running processes.

When specifying the pid this operation is much faster so if you are
interested in specific processes, the pid should be
specified. Otherwise, the plugin returns all processes one on each
row.


Arg | Description | Type
----|-------------|-----
pid|A process ID to list. If not provided list all processes.|int64


## read_file
<span class='vql_type pull-right'>Plugin</span>

Read files in chunks.

This plugin reads a file in chunks and returns each chunks as a separate row.

It is useful when we want to report file contents for small files like
configuration files etc.

The returned row contains the following columns: data, offset, filename


Arg | Description | Type
----|-------------|-----
chunk|length of each chunk to read from the file.|int
max_length|Max length of the file to read.|int
filenames|One or more files to open.|list of string (required)
accessor|An accessor to use.|string


## scope
<span class='vql_type pull-right'>Plugin</span>

The scope plugin returns the current scope as a single row.

The main use for this plugin is as a NOOP plugin in those cases we
dont want to actually run anything.

### Example

```sql
SELECT 1+1 As Two FROM scop()
```



## stat
<span class='vql_type pull-right'>Plugin</span>

Get file information. Unlike glob() this does not support wildcards.

Arg | Description | Type
----|-------------|-----
filename|One or more files to open.|list of string (required)
accessor|An accessor to use.|string


## switch
<span class='vql_type pull-right'>Plugin</span>

Executes each query. The first query to return any rows will be emitted.


## tempfile
<span class='vql_type pull-right'>Function</span>

Create a temporary file and write some data into it.

The file will be automatically removed when the query completes.


Arg | Description | Type
----|-------------|-----
data|Data to write in the tempfile.|list of string
extension|An extension to place in the tempfile.|string
permissions|Required permissions (e.g. 'x').|string
remove_last|If set we delay removal as much as possible.|bool


## upload
<span class='vql_type pull-right'>Function</span>

Upload a file to the upload service. For a Velociraptor client this
will upload the file into the flow and store it in the server's file store.

If Velociraptor is run locally the file will be copied to the
`--dump_dir` path or added to the triage evidence container.


Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string


## upload
<span class='vql_type pull-right'>Plugin</span>

Upload files to the server.

This plugin uploads the specified file to the server. If Velociraptor
is run locally the file will be copied to the `--dump_dir` path or
added to the triage evidence container.

This functionality is also available using the upload() function which
might be somewhat easier to use.


Arg | Description | Type
----|-------------|-----
files|A list of files to upload|list of string (required)
accessor|The accessor to use|string


## upload_gcs
<span class='vql_type pull-right'>Function</span>

Upload files to GCS.

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
project|The project to upload to|string (required)
credentials|The credentials to use|string (required)


## upload_s3
<span class='vql_type pull-right'>Function</span>

Upload files to S3.

Arg | Description | Type
----|-------------|-----
file|The file to upload|string (required)
name|The name of the file that should be stored on the server|string
accessor|The accessor to use|string
bucket|The bucket to upload to|string (required)
region|The region the bucket is in|string (required)
credentialskey|The AWS key credentials to use|string (required)
credentialssecret|The AWS secret credentials to use|string (required)
endpoint|The Endpoint to use|string
serversideencryption|The server side encryption method to use|string
noverifycert|Skip TLS Verification|bool


## write_csv
<span class='vql_type pull-right'>Plugin</span>

Write a query into a CSV file.

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|string (required)
accessor|The accessor to use|string
query|query to write into the file.|StoredQuery (required)


## yara
<span class='vql_type pull-right'>Plugin</span>

Scan files using yara rules.

The `yara()` plugin applies a signature consisting of multiple rules
across files. You can read more about [yara rules](https://yara.readthedocs.io/en/v3.4.0/writingrules.html). The
accessor is used to open the various files which allows this plugin to
work across raw ntfs, zip members etc.

Scanning proceeds by reading a block from the file, then applying the
yara rule on the block. This will fail if the signature is split
across block boundary. You can choose the block size to be
appropriate.

Note that because we are just scanning the file data, yara plugins
like the pe plugin will not work. You can emulate all the yara plugins
with VQL anyway (e.g. to test for pe headers)

Typically the yara rule does not change for the life of the query, so
we cache it to avoid having to recompile it each time. The `key`
variable can be used to uniquely identify the cache key for the
rule. If the `key` variable is not specified, we use the rule text
itself to generate the cache key. It is recommended that the `key`
parameter be specified because it makes it more efficient.

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

