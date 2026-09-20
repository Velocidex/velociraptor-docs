---
title: org_create
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Creates a new organization.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
name|The name of the org.|string (required)
org_id|An ID for the new org (if not set use a random ID).|string

**Required permissions:** `ORG_ADMIN`

### Description

Creates a new organization.

