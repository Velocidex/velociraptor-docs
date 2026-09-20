---
title: import
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Imports an artifact into the current scope.

  Importing an artifact loads the artifact's `export` section into
  the current scope.

  This only works in notebooks! In an artifact definition this
  statement is not needed, since you can always add the dependent
  artifact to the `imports` section.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
artifact|The Artifact to import|string (required)
### Description

Imports an artifact into the current scope.

Importing an artifact loads the artifact's `export` section into
the current scope.

This only works in notebooks! In an artifact definition this
statement is not needed, since you can always add the dependent
artifact to the `imports` section.


