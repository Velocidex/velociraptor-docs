---
title: favorites_save
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## favorites_save
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

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

NOTE: A favorite belongs to the calling user - this function will
update the favorite for the calling user only.


