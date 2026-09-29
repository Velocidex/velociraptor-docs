# utf16_encode



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)
### Description

Encode a string to utf16 bytes.

### Example

```vql
utf16_encode(string="ABCD") -> "A\u0000B\u0000C\u0000D\u0000"
```



