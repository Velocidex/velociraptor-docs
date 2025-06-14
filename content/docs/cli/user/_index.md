---
menutitle: "user"
title: 'The "user" command group'
date: 2025-05-20
draft: false
weight: 100
summary: "Commands for working with users"
---

Manage Velociraptor users.

Since these commands apply to user objects in the server's datastore, you will
always need to use the `--config` (or `-c`) flag with them.


{{% notice warning %}}

Changes made using this CLI command will not be effective until the server is
restarted!

To add or modify users during runtime you should instead use the `user`,
`user_create`, `user_delete`, or `user_grant` [VQL functions]({{< ref
"/vql_reference/" >}}).

{{% /notice %}}

---

### [ user add ]

```text
user add --role=ROLE <username> [<password>]
    Add a user. If the user already exists this allows to change their password.

    --role=ROLE  Specify the role for this user.

Args:
  <username>    Username to add
  [<password>]  The password. If not specified we read from the terminal.
```

When using this command with SSO is configured, the password will not be
required or asked for.

---

### [ user show ]

```text
user show [<flags>] <username>
    Display information about a user

    --[no-]with_hashes  Displays the password hashes too.

Args:
  <username>  Username to show
```
