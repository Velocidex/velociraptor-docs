# netcat



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
address|The address to connect to (can be a file in case of a unix domain socket)|string (required)
type|Can be tcp or unix (default TCP)|string
send|Data to send before reading|string
sep|The separator that will be used to split (default - line feed)|string
chunk_size|Read input with this chunk size (default 64kb)|int
retry|Seconds to wait before retry - default 0 - do not retry|int

**Required permissions:** `NETWORK`

### Description

Make a tcp connection and read data from a socket.


