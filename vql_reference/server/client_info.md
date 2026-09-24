# client_info



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id||string (required)

**Required permissions:** `READ_RESULTS`

### Description

Returns client info (like the fqdn) for a specific client from the
datastore.

You can use this function to enrich information about clients in VQL output.

Velociraptor maintains basic information about the client in the data store,
such as its hostname, OS etc. This function queries the internal in-memory
database so it is very fast and suitable to be called frequently on each
row.

### Example

**1. Enriching hostnames**

Internally, Velociraptor uses client id to uniquely identify the client. But
often we want to provide a hostname as well. In the below we look at
collection output from the `source()` plugin and add an additional Hostname
column by resolving the client id on each row to its hostname.

```vql
SELECT *,
   client_info(client_id=client_id).os_info.hostname AS Hostname
FROM source()
```
### See also

- [clients]({{< ref "/vql_reference/server/clients/" >}}): Returns client
  info for one or more clients from the datastore.



