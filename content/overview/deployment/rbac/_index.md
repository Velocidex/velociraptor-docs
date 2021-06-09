---
title: "Users and Roles"
date: 2021-06-09T03:11:23Z
draft: false
weight: 25
---


## User permissions

When running the deb package Velociraptor is running as a non-root
user with limited permissions. You must change to this user before
manipulating any data, or the service may not be able to open the
modified files.  Velociraptor will refuse running as another user or
as root to prevent permission problems sudo -u velociraptor ...

## Role based Access Control

Velociraptor uses a simple role based access control scheme for now

Various Actions require specific permissions
Users are granted roles which bestow them with a set of permissions.

## Granting a user role

Currently roles are hard coded

* administrator: Can do anything without limits
* reader: Can read collected data and notebooks
* api: Can connect over the API (more later)
* analyst: reader + create bulk downloads, edit notebooks
* investigator: analyst + schedule new collections and hunts
* artifact_writer: powerful role that allows the user to create and modify artifacts (more on this later)

Just because a user is authenticated by Google does not mean they have
access to the Velociraptor console!

You must authorize each user to access the console by granting them at least the reader role.

Manipulate acls using the "acl show" "acl grant" command

Your Velociraptor server is ready.
You should have a valid SSL Cert and Avatar provided by Google OAuth2


{{% notice tip Velociraptor %}}

Velociraptor internals, the file store: Velociraptor uses a filestore
abstraction to store data.  By default, we use a simple directory
structure in the filesystem.  Having simple files simplifies data
retention, data migration, backups etc.  Makes it easy to integrate
with another system (use scp or rsync to just copy files around).  If
files are deleted, Velociraptor will just recreate them - it is safe
to just remove everything!

{{% /notice %}}
