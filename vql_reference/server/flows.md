# flows



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string
summary|If specified we fetch just the basic summary of the flow. This is a bit faster.|bool

**Required permissions:** `READ_RESULTS`

### Description

Retrieve the flows launched on each client.

Each flow record will include the creator of the flow, the request
and metadata about the collection.



