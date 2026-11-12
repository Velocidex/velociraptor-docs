# get_client_monitoring



{{< badge >}}Function{{< /badge >}}


**Required permissions:** `READ_RESULTS`

### Description

Retrieve the current client monitoring state.

The client monitoring table represents the server's configuration
of client event queries to deploy.

This function is designed to allow programmatic manipulation of
the event query table in conjunction with the
`set_client_monitoring()` function.

It is commonly used together with the `patch()` function to patch
the data structure to add additional event queries.



