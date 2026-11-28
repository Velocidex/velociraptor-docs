# sample



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
query|Source query.|StoredQuery (required)
n|Pick every n row from query.|int64 (required)
### Description

Executes 'query' and samples every n'th row.

This is most useful on the server in order to downsample event
artifact results.



