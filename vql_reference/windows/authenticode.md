# authenticode



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
accessor|The accessor to use.|string
filename|The filename to parse.|OSPath (required)
verbose|Set to receive verbose information about all the certs.|bool

**Required permissions:** `MACHINE_STATE`

### Description

Parses authenticode information from PE files.

On windows, the function will also use the windows API to determine
if the binary is trusted by the system.



