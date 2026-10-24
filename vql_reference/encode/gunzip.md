# gunzip



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
string|Data to apply Gunzip|string (required)
max_bytes|Maximum length of bytes to read into memory|int64
### Description

Uncompress a gzip-compressed block of data.

### Example

```vql
gunzip(string=base64decode(string="H4sIAAAAAAACA3N0pC4AAKAb0QxQAAAA")) -> "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
```



