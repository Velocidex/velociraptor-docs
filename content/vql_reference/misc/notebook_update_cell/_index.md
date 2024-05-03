---
title: notebook_update_cell
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## notebook_update_cell
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
notebook_id|The id of the notebook to update|string (required)
cell_id|The cell of the notebook to update. If this is empty we add a new cell to the notebook|string
type|Set the type of the cell if needed (markdown or vql).|string
input|The new cell content.|string (required)
output|If this is set, we do not calculate the cell but set this as the rendered output.|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">COLLECT_SERVER</i>

### Description

Update a notebook cell.

