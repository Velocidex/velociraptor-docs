# monitoring



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id|The client id to extract|string (required)
artifact|The name of the event artifact to read|string (required)
source|An optional named source within the artifact|string
start_time|Start return events from this date (for event sources)|Any
end_time|Stop end events reach this time (event sources).|Any
start_row|Start reading the result set from this row|int64

**Required permissions:** `READ_RESULTS`

### Description

Extract monitoring log from a client.



