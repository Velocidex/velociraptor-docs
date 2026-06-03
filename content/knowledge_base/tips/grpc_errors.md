# GRPC error, received message larger than max

This error occurs when an API call attempts to transfer a message
larger than the maximum allowed (by default about 4Mb).

Velociraptor's GUI uses the gRPC API internally to interact with the
server. When the API call attempts to fetch too much data the gRPC
backend will refuse the call with the above error.

## What does it mean?

The error `GRPC Error: received message larger than max` occurs when
an API call returns too much data to fit within a single gRPC
call.

### Can I increase the maximum size of the gRPC call?

It is possible to change the gRPC message size limit using the
configuration file. Simply add the following section.

```yaml
api_config:
  max_grpc_recv_size: 4000000
```

However, this not recommended! The default 4Mb limit is reasonable and
increasing it will lead to performance degradation. Generally messages
should be kept small for performance reasons so it is better to fix
the root cause rather than just increase the limit.

### Poorly written VQL query.

Most often the error occurs when the VQL query within an artifact
attempts to return too much data within the JSON output. This is
common for example with use of the
[read_file()](/vql_reference/popular/read_file/) function. While VQL
itself has no problem stuffing any size object into a single row, the
GUI in unable to fetch such a large row.

A common pattern is:

```vql
SELECT OSPath, read_file(filename=OSPath) AS FileData
FROM yara(....)
```

The above query attempts to read the file that matched and pass it
back as field. This query is likely to fail because the row will be
too large and may exceed the default 4mb gRPC transfer limit when the
GUI attempts to read it.

The above query may be rewritten as:

```vql
SELECT OSPath, upload(file=OSPath) AS Upload
FROM yara(...)
```

This query is much better as the bulk data is tranferred as a file and
only a reference is emitted into the JSON. Within an artifact you may
specify that the column be viewed with the `upload_preview` column
type which will render a nice inspector (with a hex viewer, text,
allow searching within the blob etc).

```yaml
name: TestArtifact
sources:
- query: |
  SELECT OSPath, upload(file=OSPath) AS Upload
  FROM yara(...)

column_types:
- name: Upload
  type: upload_preview
```

### Parameters too large for collection

Some artifacts accept parameters which can potentially be very
large. For example, consider the
[Generic.Detection.Yara.Glob[(/artifact_references/pages/generic.detection.yara.glob)
artifact. This artifact accepts Yara rules as a parameters.

If you have very large rule set (potentially over 4mb) then the
request Velociraptor needs to send to the client becomes very
large. This may cause a gRPC error when viewing the request in the
GUI.

In this case it is better to send the Yara ruleset as an [external
tool](/docs/artifacts/tools/) or specify the parameter type as an
`upload`. The above artifact already supports accepting Yara rules via
these methods. External tools or uploads are fetched separately by the
endpoint over HTTP. The resulting request is kept small and the server
is more efficient.

Tags: #debugging #vql
