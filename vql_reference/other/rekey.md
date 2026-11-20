# rekey



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
wait|Wait this long before rekeying the client.|int64

**Required permissions:** `EXECVE`

### Description

Causes the client to rekey and regenerate a new client ID. DANGEROUS! This
will change the client's identity and it will appear as a new client in the
GUI.



