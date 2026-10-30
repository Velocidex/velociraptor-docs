---
title: favorites_save
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Save a collection into the favorites.

  Velociraptor allows the user to save a collection into their
  "Favorite" list. This allows them to quickly and easily pick a
  previously used collection.

  This VQL function provides an interface for this functionality.

  ### Notes

  A favorite belongs to the calling user - this function will
  update the favorite for the calling user only.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
name|A name for this collection template.|string (required)
description|A description for the template.|string
specs|The collection request spec that will be saved. We use this to create the new collection.|LazyExpr (required)
type|The type of favorite.|string (required)
### Description

Save a collection into the favorites.

Velociraptor allows the user to save a collection into their
"Favorite" list. This allows them to quickly and easily pick a
previously used collection.

This VQL function provides an interface for this functionality.

### Notes

A favorite belongs to the calling user - this function will
update the favorite for the calling user only.


