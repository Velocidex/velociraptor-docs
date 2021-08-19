---
title: "Users and Roles"
date: 2021-06-09T03:11:23Z
draft: false
weight: 25
---

When running the Debian package, Velociraptor operates as a non-root
user with limited permissions. You must increase the permissions for this user before
manipulating any data, or the service may not be able to open the
modified files.  Velociraptor will refuse running as another user or
as root to prevent permission problems sudo -u velociraptor ...

## Role-based Access Control

Velociraptor uses a simple role-based access control framework. Certain actions require specific permissions, and users are granted roles which provide them with a set of permissions.

The following roles are provided out-of-the-box:
* **Administrator:** Can do anything without limits
* **Reader:** Can read collected data and notebooks
* **API**: Can connect over the API (more later)
* **Analyst:** Has reader permissions and can create bulk downloads and edit notebooks
* **Investigator:** Has analyst permissions and can schedule new collections and hunts
* **artifact_writer:** powerful role that allows the user to create and modify artifacts

## Granting a user role
Just because a user is authenticated by Google does not mean they have
access to the Velociraptor console. You must authorize each user to access the console by granting them at least the reader role.

Manipulate acls using the "acl show" "acl grant" command

Your Velociraptor server is ready.
You should have a valid SSL Cert and Avatar provided by Google OAuth2


{{% notice tip "Velociraptor Internals" %}}

Velociraptor uses a filestore abstraction to store data.  By default,
we use a simple directory structure in the filesystem.  Having simple
files simplifies data retention, data migration, backups etc.  Simple
filesystem also makes it easy to integrate with another system (use
scp or rsync to just copy files around).  If files are deleted,
Velociraptor will just recreate them - it is safe to just remove
everything!

{{% /notice %}}
