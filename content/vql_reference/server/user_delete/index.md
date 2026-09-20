---
title: user_delete
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Deletes a user from the server.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
user|The user to delete.|string (required)
orgs|If set we only delete from these orgs, otherwise we delete from the current org.|list of string
really_do_it|If not specified, just show what user will be removed|bool
### Description

Deletes a user from the server.

