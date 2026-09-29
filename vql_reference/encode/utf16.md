# utf16



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
string|A string to decode|string (required)
### Description

Parse input from utf16.

### Example

```vql
utf16(string='A\x00B\x00C\x00D\x00') -> "ABCD"
```



