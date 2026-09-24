# reg_set_value



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|Registry value path.|string (required)
value|Value to set|LazyExpr (required)
type|Type to set (SZ, DWORD, QWORD)|string (required)
create|Set to create missing intermediate keys|bool

**Required permissions:** `FILESYSTEM_WRITE`

### Description

Set a value in the registry.


