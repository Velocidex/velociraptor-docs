---
title: notebook_create
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Create a new notebook.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
name|The name of the notebook|string
description|The description of the notebook|string
collaborators|A list of users to share the notebook with.|list of string
public|If set the notebook will be public.|bool
artifacts|A list of NOTEBOOK artifacts to create the notebook with (Notebooks.Default)|list of string
env|An environment to initialize the notebook with|ordereddict.Dict

**Required permissions:** `COLLECT_SERVER`

### Description

Create a new notebook.

