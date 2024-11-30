---
title: rate
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## rate
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
x|The X float|float64 (required)
y|The Y float|float64 (required)

### Description

Calculates the rate (derivative) between two quantities.

For example if a monitoring plugin returns an absolute value
sampled in time (e.g. bytes transferred sampled every second) then
the rate() plugin can calculate the average bytes/sec.

This function works by remembering the values of x and y from the
previous row and applying the current rows values.


