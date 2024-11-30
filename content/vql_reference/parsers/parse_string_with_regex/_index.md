---
title: parse_string_with_regex
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_string_with_regex
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
string|A string to parse.|string (required)
regex|The regex to apply.|list of string (required)

### Description

Parse a string with a set of regex and extract fields. Returns a dict with fields populated from all regex capture variables.

