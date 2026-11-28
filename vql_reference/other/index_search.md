# index_search



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|The file path to the index to open.|string (required)
search|A Bleve search query. See https://blevesearch.com/docs/Query-String-Query/|string (required)
fields|A list of fields to include from the index.|list of string
sort|The field to sort by (precede with - to sort in descending order).|list of string
start|Row number to start.|uint64

**Required permissions:** `FILESYSTEM_READ`

### Description

Search a previously created index.


