# flow_results



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|The artifact to retrieve|string
source|An optional source within the artifact.|string
flow_id|The hunt id to read.|string (required)
client_id|The client id to extract|string (required)

**Required permissions:** `READ_RESULTS`

### Description

Retrieve the results of a flow.

This is similar to the source() plugin.

### Notes

Since a collection can collect multiple artifacts you must
specify the artifact you are interested in.



