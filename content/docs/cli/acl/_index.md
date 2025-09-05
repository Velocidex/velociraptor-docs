---
menutitle: "acl"
title: 'The "acl" command group'
date: 2025-05-20
draft: false
weight: 10
summary: Manipulate ACLs (access control lists).
---

Manipulate ACLs (access control lists).

Since ACLs apply to user objects in the server's datastore, you will always need
to use the `--config` (or `-c`) flag with these commands.

{{% notice warning %}}

Changes made using this CLI command will not be effective until the server is
restarted!

To add or modify users during runtime you should instead use the `user`,
`user_create`, `user_delete`, or `user_grant` [VQL functions]({{< ref
"/vql_reference/" >}}).

{{% /notice %}}

---

### [ acl show ]

```text
acl show [<flags>] <principal>
    Show a principal's policy.

    --[no-]effective  Show the effective persmissions object.

Args:
  <principal>  Name of principal to grant.
```

---

### [ acl grant ]

```text
acl grant [<flags>] <principal> [<policy>]
    Grant a principal a policy.

    --org=ORG     OrgID to grant
    --role=ROLE   A comma separated list of roles to grant the principal
    --[no-]merge  If specified we merge this policy with the old policy.

Args:
  <principal>  Name of principal (User or cert) to grant.
  [<policy>]   A policy to grant as a json encoded string
```
