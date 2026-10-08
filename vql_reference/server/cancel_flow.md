# cancel_flow



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id||string (required)
flow_id||string

**Required permissions:** `COLLECT_SERVER`, `COLLECT_CLIENT`

### Description

Cancels the flow.

This sends the client an immediate cancellation message and stops
the flow. It also removes any outstanding requests for the client
if there are any.



