# background



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
query|Run this query in the background.|StoredQuery
### Description

Run a query in the background.

All output from the query is discarded. The query will not wait
for the background thread to exit - instead the background query
will be cancelled when this query exists.



