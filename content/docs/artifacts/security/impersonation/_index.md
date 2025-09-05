---
menutitle: "Impersonation"
title: "Impersonation"
date: 2025-05-24
weight: 100
draft: true
summary: "Impersonation"
last_reviewed: 2025-05-24
---
## Server Artifacts and Impersonation

The above discussion centered around controlling access to client
artifacts. But sometimes we need to also control access to server
artifacts. For example, suppose I wanted to allow the restricted user
above to create a hunt with the `Generic.Client.Info` artifact in it.

In order for users to create hunts, they need the `Start Hunt`
permission. However giving users this permission allows them to create
**any** hunt which is dangerous. I really only want to allow the user
to create a **specific** hunt.

I can use the above approach to create a wrapper artifact:

```yaml
name: Start.Hunt.Generic.Client.Info
type: SERVER

sources:
  - query: |
      SELECT hunt(description="A general hunt",
                  artifacts='Generic.Client.Info')
      FROM scope()
```

This artifact allows a user to start a hunt. I can mark it as a basic
artifact and allow my user to launch it.

However, this still does not work!

![Server artifacts run with the permissions of the launching user](server_artifacts_permissions.svg)

The reason is that server artifacts are running on the server, where
ACL permissions are enforced. The VQL query itself is running with the
user token and so can only ever do the same permissions that the user
is allowed to do.

This means that the while I can mark the artifact itself as `basic`
and allow the user to run the artifact, the VQL inside the artifact
can not exceed the permissions of the user.

In order to achieve what I want here (which is to give the user a
controlled privilege to do just one thing), I need to have the server
artifact running with different credentials than the launching user -
In order words I need to `Impersonate` the admin user.

```yaml
name: Start.Hunt.Generic.Client.Info
type: SERVER
impersonate: admin

sources:
  - query: |
      SELECT hunt(description="A general hunt",
                  artifacts='Generic.Client.Info')
      FROM scope()
```

The `impersonate: admin` directive tells Velociraptor that when
running this artifact, the server will use the permissions of the
admin user instead of the launching user.

This is exactly the same as the Linux `suid` mechanism or the windows
`Impersonation` mechanism.

![This time the artifact works with the impersonated user](impersonation.png)
