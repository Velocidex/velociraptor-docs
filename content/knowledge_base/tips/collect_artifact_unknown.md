# Error "Parameter refers to an unknown artifact" when collecting a CLIENT artifact

Before an artifact is collected from the client, the artifact is
compiled into a VQL request by the artifact compiler. This actually
transforms the vql and injects dependent artifacts into the request so
the client can evaluate it. The client's VQL engine will **never** use
built in artifacts and must always have artifacts injected in the request.

The reason for that is that if an artifact is updated on the server
(e.g. by upgrading the server or edit the custom artifact) the client
must be given the latest version of the artifact.

When the VQL compiler sees a statement like:

```vql
SELECT * FROM Artifact.Dependant.Artifact()
```

It will recognize the the the VQL is dependent on the artifact
`Dependent.Artifact` and will inject it into the VQL request. You can
see this in the `Request` tab - the `artifacts` section of the request
will include dependent artifact definitions (in this case the artifact
calls `Generic.Utils.FetchBinary`).

```json
[
  {
     "session_id": "F.CR3B2IIN3E8GK",
     "request_id": "1",
     "FlowRequest": {
         "VQLClientActions": [
         {
           "query_id": "1",
           "total_queries": "1",
           ....
           "artifacts": [
           {
               "name": "Generic.Utils.FetchBinary",
               "parameters": [
```

This issue comes up commonly in two scenarios:

### Using the VQL shell to collect a custom artifact

In this case the GUI will collect the artifact `Generic.Client.VQL`
which essentially evaluates the query provided as a string on the
client.

Because the query is given as an opaque string parameter, the artifact
compiler does not see any dependencies and can not inject them into
the request. Built in artifacts are allowed in this case but custom
artifacts are not supported.

If you need to collect a custom artifact from the endpoint, just
collect it as normal - do not use the VQL shell for that.

### Using the `collect()` plugin on the client to prepare a collection zip file.

Another similar issue occurs when writing a custom artifact that uses
the `collect()` plugin. Similarly because the artifacts to collect are
given as strings, the compiler has no idea these are a dependency.

For example this VQL code

```vql
SELECT * from collect(artifacts=['Generic.Collectors.File'],
   args=dict(`Generic.Collectors.File`=dict(`collectionSpec`=collectionSpec,
             `Root`=Root)),
   password='infected',
   output=tempzip)
```

To fix this artifact the `Generic.Collectors.File` artifact must be
given as a dependency. Either include it in the artifact's `import`
section or add the following VQL statement:

```vql
LET _ = SELECT * FROM Artifact.Generic.Collectors.File()
```

That statement will not actually run the artifact (it is a lazy LET
statement) but the compiler's static analyzer will identify the
artifact as a dependency and be able to inject it into the request.

Tags: #vql
