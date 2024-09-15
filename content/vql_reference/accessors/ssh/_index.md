---
title: ssh
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## ssh
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Access a remote system's filesystem via `SSH/SFTP`.

This accessor allows accessing remote systems via `SFTP/SSH`.  This is
useful for being able to search remote systems where it is not
possible to run a Velociraptor client directly on the endpoint. For
example, on embedded edge devices such as routers/firewalls/VPN
servers etc.

To use this accessor you will need to provide credentials via the
SSH_CONFIG scope variable:

```vql
LET SSH_CONFIG <= dict(hostname='localhost:22',
  username='mic',
  private_key=read_file(filename='/home/mic/.ssh/id_rsa'))

SELECT OSPath FROM glob(accessor="ssh", globs="/*")
```

NOTES:

1. hostname must have a port after the column.
2. You can provide a password instead of a private key via the
   password parameter to the `SSH_CONFIG`
3. The private_key parameter must contain an unencrypted PEM encoded
   SSH private key pair.

NOTE: It is more convenient to use the [secrets support]({{< ref
"/blog/2024/2024-03-10-release-notes-0.72/#secret-management" >}}) in
0.72 to manage these credentials.


