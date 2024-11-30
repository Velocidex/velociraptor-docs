---
title: grok
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## grok
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
grok|Grok pattern.|string (required)
data|String to parse.|string (required)
patterns|Additional patterns.|Any
all_captures|Extract all captures.|bool

### Description

Parse a string using a Grok expression.

This is most useful for parsing syslog style logs (e.g. IIS, Apache logs).

You can read more about GROK expressions here
https://www.elastic.co/blog/do-you-grok-grok


