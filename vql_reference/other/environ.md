# environ



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
var|Extract the var from the environment.|string (required)

**Required permissions:** `MACHINE_STATE`

### Description

Get an environment variable.




{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
vars|Extract these variables from the environment and return them one per row|list of string
### Description

The row returned will have all environment variables as
columns. If the var parameter is provided, only those variables
will be provided.



