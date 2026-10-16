# tempfile



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
data|Data to write in the tempfile.|list of string
extension|An extension to place in the tempfile.|string
permissions|Required permissions (e.g. 'x').|string
remove_last|If set we delay removal as much as possible.|bool

**Required permissions:** `FILESYSTEM_WRITE`

### Description

Create a temporary file and write some data into it.

The file will be automatically removed when the query completes.



