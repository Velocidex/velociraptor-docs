---
menutitle: "Basic Artifacts"
title: "Basic Artifacts"
date: 2025-05-24
weight: 100
draft: true
summary: "Setting up Basic artifacts for low-privilege users"
last_reviewed: 2025-05-24
---

While hiding the artifacts in the GUI helps to reduce clutter, it
does not stop someone from launching those artifacts (for example
using a VQL query). The artifacts are actually still available but
they are just hidden. Therefore hiding an artifact **is not a security
measure**.

In Velociraptor, a user's permissions control what actions they can
take in the GUI **or** using a VQL query. If a user is allowed to
collect artifacts from the client, they can collect **any** artifact,
including hidden artifacts.

However some artifacts are more dangerous than others and require more
experienced operators.

Velociraptor user permission are given as part of `Roles` or
specifically granted in the user policy.

![Giving a user reduced roles and additional permissions](user_permissions.svg)

The above example shows a user given the `Read Only` role. This role
does not allow the user to collect new artifacts from the endpoint,
nor does it allow them to update notebook cells (but they can read
notebooks).

However, here I give the user additional permissions on top of their role:

1. Label Clients - the user is allowed to manipulate client labels
2. Collect Basic Client - The user is allowed to collect basic artifacts from the client.
3. Notebook Editor - The user is allowed to update notebook cells (and
   by extension evaluate VQL queries on the server).


If the user attempts to collect an artifact from a client, they will
be denied because they do not have the `COLLECT_CLIENT` permission.

However we can allow the user to collect **Some** artifacts that we
deem to be safe.

```sql
LET BasicArtifacts <= SELECT * FROM parse_csv(accessor="data",
filename='''Artifacts
Generic.Client.Info
''')


SELECT name, name in BasicArtifacts.Artifacts AS Basic
FROM artifact_definitions()
WHERE artifact_set_metadata(basic=NOT name in BasicArtifacts.Artifacts, name=name) OR TRUE
```

The artifact `Generic.Client.Info` is deemed basic and therefore this
user can collect it.
