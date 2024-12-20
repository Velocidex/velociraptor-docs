---
title: enumerate
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## enumerate
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
items|The items to enumerate|Any

### Description

Collect all the items in each group by bin.

This is an aggregate function that keeps track of all elements in
a GROUP BY group.

### Notes

Use this function carefully as memory use can be large. It
keeps a copy of every element in the group and that can be very
large for large result sets.


