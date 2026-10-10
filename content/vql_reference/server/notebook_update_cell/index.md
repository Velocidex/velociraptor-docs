---
title: notebook_update_cell
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Update a notebook cell.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
notebook_id|The id of the notebook to update|string (required)
cell_id|The cell of the notebook to update. If this is empty we add a new cell to the notebook|string
delete|If set the notebook cell is removed from the notebook.|bool
type|Set the type of the cell if needed (markdown or vql).|string
input|The new cell content.|string
output|If this is set, we do not calculate the cell but set this as the rendered output.|string

**Required permissions:** `COLLECT_SERVER`

### Description

Update a notebook cell.

