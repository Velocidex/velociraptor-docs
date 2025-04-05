---
menutitle: "Security"
title: "Artifacts and Security"
date: 2025-01-25
weight: 55
---

Artifacts are the core way in which users interact with Velociraptor:
Users launch artifact collections from clients and collect artifacts
on the Velociraptor server.

At its core an artifact is simply a way to package VQL queries to make
them easier to use.

However, for new users the number of artifacts can be
overwhelming. Coupled with the power that artifacts can wield there is
a need to control which users are able to access which artifacts: This
helps to avoid mistakes due to inexperience. For example running a
`Windows.KapeFiles.Target` collections as a large scale hunt is almost
always a bad idea!

Most users develop their own operating procedures specifying:
1. Which artifacts are to be used in which situation
2. Who is allowed to launch more sensitive artifacts
3. How artifacts are to be used (what type of arguments are allowed).

In the below page we discuss how Velociraptor enabled each of these
goals.

## Hidden artifacts

The first goal is to clean up the vast number of artifacts that are
presented through the GUI. Because Velociraptor allows artifacts to be
customized, new artifacts to be added to large number of artifacts
imported from external sources (i.e. `Artifact Packs`), there could be
hundreds or thousands of artifacts loaded in the system. Many have
similar but different functionality. This can overwhelm a user with
too much choice and be confusing.

To clean up the interface, Velociraptor allows artifacts to be hidden
from the GUI. This means that they are not shown as part of the search
functionality in the artifact collections wizard or in the
artifact. However the artifacts still exist in Velociraptor and can be
seen as part of the `artifact_definitions()` plugin output.

The visibility of an artifact is controlled by `artifact metadata` - a
field attached to each artifact in the system. You can hide or show
each artifact using the `artifact_set_metadata()` function.

### Example: Making only certain artifacts visible.

The following VQL can be run in a notebook to hide all artifacts other
than a selected set:

```sql
LET VisibleArtifacts <= SELECT * FROM parse_csv(accessor="data",
filename='''Artifacts
Windows.Search.FileFinder
Windows.Forensics.Usn
Windows.NTFS.MFT
Generic.Client.Info
''')


SELECT name, name in VisibleArtifacts.Artifacts AS Visible
FROM artifact_definitions()
WHERE artifact_set_metadata(hidden=NOT name in VisibleArtifacts.Artifacts, name=name) OR TRUE
```

This results in only those artifacts appearing in the GUI.

![Hidden Artifacts](hidden_artifacts.svg)

This reduced view can help guide users into more preferred playbooks
and procedures, reducing confusion.


## Basic artifacts

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

## Controlling access to artifacts

Now that we have learned how to hide artifacts in the search GUI, and
how to mark some artifacts as basic, we can proceed to tie down some
artifacts in a safe way.

To illustrate this approach, suppose I wanted to allow my low
privilege user to run `ipconfig` on the remote system. I know that I
can shell out to the system shell using the artifact
`Windows.System.CmdShell`. However, giving the user access to that
artifact is extremely dangerous - because that artifact allows
arbitrary commands to be launched on the endpoint.

I want to further reduce the way in which the
`Windows.System.CmdShell` artifact is called by **removing the user's
choices for the artifact parameters**.

I can create a new artifact

```yaml
name: Custom.Ifconfig
sources:
  - query: |
        SELECT * FROM Artifact.Windows.System.CmdShell(Command="ipconfig")
```

This artifact takes no parameters and so the user can not change the
command to anything other than `ipconfig` (which I deem safe to run on
any endpoint).

Now I will add the `basic` metadata to this artifact which will allow
the user to launch it. However the user is unable to change the
parameters or run arbitrary code.

In this way it is possible to lock down a standard operating procedure
for users:

* Velociraptor Built in artifacts are very powerful and very generic -
  their actions can be controlled by many parameters.
* You can write **wrapper artifacts** to narrow down the choices
* Setting those artifacts as basic can allow users to use a reduced
  functionality version of the artifacts safely.

{{% notice warning "Allowing users to modify artifacts" %}}

Users with the `ARTIFACT_WRITER` permission are allowed to modify the artifact itself. Therefore, if the user can change the artifact the above access control is bypassed.

We consider users with `ARTIFACT_WRITER` as admin equivalent since it
is easy to escalate to full admin with that permission.

{{% /notice %}}


## Server artifacts and Impersonation

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
