---
title: smb
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## smb
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
hosts|A dict mapping hostname to connection strings. The connection string consists of username and password joined by colon (e.g. fred:hunter2 ).|ordereddict.Dict (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">NETWORK</span>

### Description

Access smb shares (e.g. Windows shares).

This accessor is similar to the `s3` accessor in allowing access
to remote network shares. The credentials are passed in a scope
variable called `SMB_CREDENTIALS`. The credentials are a dict with
the server name being the key and the username and password joined
with ":".

The first element in the path is treated as the server name (top
level directory). The accessor then looks up the relevant
credentials from the `SMB_CREDENTIALS` dict. This allows multiple
servers and multiple credentials to be defined at the same time.

### Example

```
LET SMB_CREDENTIALS <= dict(ServerName="Username:Password")

SELECT OSPath,
FROM glob(globs='*',
  root="/ServerName/Windows/System32",
  accessor="smb")
```

### Notes

It is more convenient to use the [secrets support]({{< ref
"/blog/2024/2024-03-10-release-notes-0.72/#secret-management" >}})
in 0.72 to manage these credentials.


