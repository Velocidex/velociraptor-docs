---
title: notebook_update_cell
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## notebook_update_cell
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
notebook_id|The id of the notebook to update|string (required)
cell_id|The cell of the notebook to update. If this is empty we add a new cell to the notebook|string
delete|If set the notebook cell is removed from the notebook.|bool
type|Set the type of the cell if needed (markdown or vql).|string
input|The new cell content.|string
output|If this is set, we do not calculate the cell but set this as the rendered output.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_SERVER</span>

### Description

Update a notebook cell.

