---
title: http_client
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## http_client
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
url|The URL to fetch|string (required)
params|Parameters to encode as POST or GET query strings|ordereddict.Dict
headers|A dict of headers to send.|ordereddict.Dict
method|HTTP method to use (GET, POST, PUT, PATCH, DELETE)|string
data|If specified we write this raw data into a POST request instead of encoding the params above.|string
chunk_size|Read input with this chunk size and send each chunk as a row|int
disable_ssl_security|Disable ssl certificate verifications (deprecated in favor of SkipVerify).|bool
skip_verify|Disable ssl certificate verifications.|bool
tempfile_extension|If specified we write to a tempfile. The content field will contain the full path to the tempfile.|string
remove_last|If set we delay removal as much as possible.|bool
root_ca|As a better alternative to disable_ssl_security, allows root ca certs to be added here.|string
cookie_jar|A cookie jar to use if provided. This is a dict of cookie structures.|ordereddict.Dict
user_agent|If specified, set a HTTP User-Agent.|string
secret|If specified, use this managed secret. The secret should be of type 'HTTP Secrets'. Alternatively specify the Url as secret://name|string
files|If specified, upload these files using multipart form upload. For example [dict(file="My filename.txt", path=OSPath, accessor="auto"),]|list of ordereddict.Dict

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_SERVER</i>

### Description

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

```vql
SELECT Content as IP from http_client(url='http://www.myexternalip.com/raw')
```

You can use this plugin to download file contents by passing the
`tempfile_extension` parameter. In this case this plugin will
create a new temp file with the specified extension, write the
content of the HTTP request into it and then emit a row with
`Content` being the name of the file. The file will be
automatically removed when the query ends.

### Example: Uploading files

Many API handlers support uploading files via POST messages. This
is supported using the `files` parameter for this plugin. The
plugin will automatically switch to `multipart/form` mode and
stream the file content. This allows you to upload very large
files with minimal memory impact. Here is an example:

```vql
SELECT *
FROM http_client(
    url='http://localhost:8002/test/',
    method='POST',
    files=dict(file='file.txt', key='file', path='/etc/passwd', accessor="file")
)
```
Here the files can be an array of dicts with the following fields:
* file: The name of the file that will be stored on the server
* key: The name of the form element that will receive the file
* path: This is an OSPath object that we open and stream into the form.
* accessor: Any accessor required for the path.


